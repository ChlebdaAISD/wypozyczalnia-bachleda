import ReactDOMServer from 'react-dom/server'
import App from './App.jsx'
import { TRAILS } from './data/content.js'
import { FAQ_ITEMS } from './components/sections/FAQ.jsx'

const DOMAIN = 'https://www.rowerybachleda.pl'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

const homeMeta = {
  title: 'Wypożyczalnia rowerów Podhale — u Bachledy w Podczerwonem',
  description:
    'Wypożyczalnia rowerów Podhale — u Bachledy w Podczerwonem (gmina Czarny Dunajec). Rowery klasyczne i elektryczne, riksze, kask gratis, parking. Bezpośrednio przy Szlaku Wokół Tatr.',
  canonical: `${DOMAIN}/`,
  breadcrumb: [],
  additionalSchema: faqSchema,
}

const trailRoutes = Object.fromEntries(
  TRAILS.map((t) => [
    `/trasy/${t.slug}/`,
    {
      title: `${t.title} — Wypożyczalnia Rowerów u Bachledy`,
      description: t.short,
      canonical: `${DOMAIN}/trasy/${t.slug}/`,
      breadcrumb: [
        { name: 'Wypożyczalnia u Bachledy', url: `${DOMAIN}/` },
        { name: t.title, url: `${DOMAIN}/trasy/${t.slug}/` },
      ],
      additionalSchema: {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: t.title,
        description: t.short,
        url: `${DOMAIN}/trasy/${t.slug}/`,
        touristType: 'cyklisci',
        itinerary: {
          '@type': 'Place',
          name: t.mapsQuery || t.title,
        },
        offers: {
          '@type': 'Offer',
          name: 'Wypożyczenie roweru',
          url: `${DOMAIN}/`,
          priceCurrency: 'PLN',
          price: '50',
          availability: 'https://schema.org/InStock',
        },
        provider: {
          '@type': 'BicycleStore',
          name: 'Wypożyczalnia Rowerów u Bachledy',
          url: `${DOMAIN}/`,
        },
      },
    },
  ])
)

const routesMeta = {
  '/': homeMeta,
  ...trailRoutes,
}

export function getRoutes() {
  return Object.keys(routesMeta)
}

export function getRouteMeta(path) {
  return routesMeta[path] || routesMeta['/']
}

export function render(routePath) {
  const meta = routesMeta[routePath] || routesMeta['/']
  // wouter ssrPath expects no trailing slash for non-root routes — strip it
  const ssrPath = routePath === '/' ? '/' : routePath.replace(/\/$/, '')
  const html = ReactDOMServer.renderToString(<App ssrPath={ssrPath} />)
  return { html, meta }
}
