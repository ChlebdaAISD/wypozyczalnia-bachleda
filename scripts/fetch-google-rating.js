import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

// Build-time fetch wzorowany na AI_Solutions_Design_v2/script/fetch-google-rating.ts.
// Pobiera aktualną ocenę + liczbę opinii z Google Places API (New) i zapisuje je do
// src/data/google-rating.json. Wartości wstrzykuje do schema LocalBusiness scripts/prerender.js.
// Graceful: jeśli brak klucza / API zawiedzie — NIE rzuca, zostawia istniejący JSON (fallback).

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/google-rating.json')

// Place ID profilu "Wypożyczalnia Rowerów u Bachledy" (źródło: references/stats.md).
const PLACE_ID = 'ChIJ16OSW6jpFUcRRYrwENfF1iQ'

function readApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY.trim()
  const keyPath = path.join(os.homedir(), '.config/google/places_api_key')
  if (fs.existsSync(keyPath)) return fs.readFileSync(keyPath, 'utf-8').trim()
  return null
}

async function fetchRating(apiKey) {
  // Place Details po Place ID (stabilne — bez ryzyka złego dopasowania jak w searchText).
  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount',
    },
  })
  // Nie logujemy body odpowiedzi — błędy auth Google mogą zawierać kontekst klucza (CI log safety).
  if (!res.ok) throw new Error(`Places API ${res.status}`)
  const data = await res.json()
  if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') {
    throw new Error('Brak rating / userRatingCount w odpowiedzi API')
  }
  return { rating: data.rating, userRatingCount: data.userRatingCount }
}

// Pobiera świeże dane i nadpisuje google-rating.json. Zwraca payload albo null (gdy fallback).
export async function updateGoogleRating() {
  const apiKey = readApiKey()
  if (!apiKey) {
    console.warn(
      '[fetch-google-rating] Brak klucza (env GOOGLE_PLACES_API_KEY lub ~/.config/google/places_api_key). Zostawiam istniejący google-rating.json.'
    )
    return null
  }
  try {
    const { rating, userRatingCount } = await fetchRating(apiKey)
    const payload = {
      ratingValue: rating.toFixed(1),
      reviewCount: String(userRatingCount),
      fetchedAt: new Date().toISOString(),
    }
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf-8')
    console.log(`[fetch-google-rating] ${payload.ratingValue} / ${payload.reviewCount} opinii → src/data/google-rating.json`)
    return payload
  } catch (err) {
    console.warn(`[fetch-google-rating] Fetch nieudany (${err.message}). Zostawiam istniejący google-rating.json.`)
    return null
  }
}

// Uruchomienie bezpośrednie: `node scripts/fetch-google-rating.js` (cross-platform main guard)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  updateGoogleRating()
}
