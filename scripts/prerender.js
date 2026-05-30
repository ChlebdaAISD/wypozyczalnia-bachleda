import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { updateGoogleRating } from './fetch-google-rating.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist/public')
const serverDistPath = path.resolve(__dirname, '../dist/server')
const ratingPath = path.resolve(__dirname, '../src/data/google-rating.json')

// Wstrzykuje aktualną ocenę Google (ratingValue + reviewCount) do statycznego bloku
// LocalBusiness JSON-LD w szablonie. Wartości z src/data/google-rating.json (odświeżane
// build-time przez fetch-google-rating.js). Gdy plik/wartości brak — zostawia fallback z index.html.
function injectGoogleRating(html) {
  try {
    if (!fs.existsSync(ratingPath)) return html
    const { ratingValue, reviewCount } = JSON.parse(fs.readFileSync(ratingPath, 'utf-8'))
    // Scope wyłącznie do obiektu aggregateRating (brak nested braces) — nie ruszamy reszty HTML/bundli.
    return html.replace(/"aggregateRating"\s*:\s*\{[\s\S]*?\}/, (block) => {
      let b = block
      if (ratingValue != null) b = b.replace(/("ratingValue"\s*:\s*)"[^"]*"/, `$1"${ratingValue}"`)
      if (reviewCount != null) b = b.replace(/("reviewCount"\s*:\s*)"[^"]*"/, `$1"${reviewCount}"`)
      console.log(`  Injected Google rating: ${ratingValue} / ${reviewCount} opinii`)
      return b
    })
  } catch (e) {
    console.warn('  Rating injection skipped:', e.message)
    return html
  }
}

function updateMetaTags(html, meta) {
  let result = html

  result = result.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)

  result = result.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`
  )

  // Canonical — replace if present, otherwise inject before </head>
  const canonicalPatterns = [
    /<noscript>\s*<link rel="canonical" href="[\s\S]*?"\s*\/?>\s*<\/noscript>/,
    /<link rel="canonical" href="[\s\S]*?"\s*\/?>/,
  ]
  let replaced = false
  for (const pattern of canonicalPatterns) {
    if (!replaced && pattern.test(result)) {
      result = result.replace(pattern, `<link rel="canonical" href="${meta.canonical}" />`)
      replaced = true
    }
  }
  if (!replaced) {
    result = result.replace(
      '</head>',
      `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`
    )
  }

  result = result.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:title" content="${meta.title}" />`
  )
  result = result.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:description" content="${meta.description}" />`
  )

  // og:url — replace if present, otherwise inject
  if (/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/.test(result)) {
    result = result.replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta property="og:url" content="${meta.canonical}" />`
    )
  } else {
    result = result.replace(
      '</head>',
      `  <meta property="og:url" content="${meta.canonical}" />\n  </head>`
    )
  }

  result = result.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="twitter:title" content="${meta.title}" />`
  )
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="twitter:description" content="${meta.description}" />`
  )

  return result
}

function generateSitemap(routes, domain) {
  const today = new Date().toISOString().split('T')[0]
  const urls = routes
    .map((route) => {
      const loc = `${domain}${route}`
      const priority = route === '/' ? '1.0' : '0.8'
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

async function prerender() {
  console.log('Starting SSR prerendering...')

  // Odśwież ocenę Google (live) przed wstrzyknięciem do schema. Graceful — nie blokuje builda.
  await updateGoogleRating()

  const templatePath = path.join(distPath, 'index.html')
  const serverEntryPath = path.join(serverDistPath, 'entry-server.js')

  if (!fs.existsSync(templatePath)) {
    console.error('Template not found at', templatePath, '— run "npm run build:client" first.')
    process.exit(1)
  }

  if (!fs.existsSync(serverEntryPath)) {
    console.error('Server entry not found at', serverEntryPath, '— run "npm run build:ssr" first.')
    process.exit(1)
  }

  let template = fs.readFileSync(templatePath, 'utf-8')

  // Wstrzyknij aktualną ocenę Google do LocalBusiness JSON-LD (dotyczy wszystkich prerenderowanych stron).
  template = injectGoogleRating(template)

  // Inline the main CSS bundle to eliminate the render-blocking <link rel="stylesheet">.
  const cssLinkMatch = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
  if (cssLinkMatch) {
    const cssHref = cssLinkMatch[1]
    const cssPath = path.join(distPath, cssHref.replace(/^\//, ''))
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf-8')
      template = template.replace(cssLinkMatch[0], `<style>${cssContent}</style>`)
      console.log(`  Inlined CSS: ${cssHref} (${(cssContent.length / 1024).toFixed(1)} KB)`)
    }
  }

  const { render, getRoutes } = await import(serverEntryPath)
  const routes = getRoutes()

  for (const routePath of routes) {
    console.log(`  Prerendering: ${routePath}`)

    const { html: appHtml, meta } = render(routePath)
    let fullHtml = updateMetaTags(template, meta)

    if (meta.breadcrumb && meta.breadcrumb.length > 0) {
      const breadcrumbSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: meta.breadcrumb.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      })
      fullHtml = fullHtml.replace(
        '</head>',
        `  <script type="application/ld+json">${breadcrumbSchema}</script>\n  </head>`
      )
    }

    if (meta.additionalSchema) {
      const additionalSchemaStr = JSON.stringify(meta.additionalSchema)
      fullHtml = fullHtml.replace(
        '</head>',
        `  <script type="application/ld+json">${additionalSchemaStr}</script>\n  </head>`
      )
    }

    fullHtml = fullHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )

    if (routePath === '/') {
      fs.writeFileSync(path.join(distPath, 'index.html'), fullHtml)
      console.log(`    → dist/public/index.html`)
    } else {
      const dirName = routePath.replace(/^\/|\/$/g, '')
      const dirPath = path.join(distPath, dirName)
      fs.mkdirSync(dirPath, { recursive: true })
      fs.writeFileSync(path.join(dirPath, 'index.html'), fullHtml)
      console.log(`    → dist/public/${dirName}/index.html`)
    }
  }

  // Generate sitemap.xml from prerendered routes (always normalize to trailing slash)
  const DOMAIN = 'https://www.rowerybachleda.pl'
  const normalizedRoutes = routes.map((r) => (r === '/' ? '/' : r.endsWith('/') ? r : `${r}/`))
  const sitemapXml = generateSitemap(normalizedRoutes, DOMAIN)
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapXml)
  console.log(`  → dist/public/sitemap.xml (${normalizedRoutes.length} URLs)`)

  console.log('\nPrerendering complete!')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
