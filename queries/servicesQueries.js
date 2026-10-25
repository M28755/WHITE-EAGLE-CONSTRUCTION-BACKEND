import groq from 'groq'

// Reusable image projection so every query returns the same shape
const imageFields = `
  "image": {
    "url": image.asset->url,
    "alt": image.alt,
    "lqip": image.asset->metadata.lqip,
    "dimensions": image.asset->metadata.dimensions
  }
`

export const serviceFields = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  featured,
  seo,
  ${imageFields}
`

// Get all services (full data)
export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(title asc) {
    ${serviceFields}
  }
`

// 2. Get paginated services with optional featured filtering
export const SERVICES_QUERY = groq`
  *[_type == "service" 
    && ($featured == null || featured == $featured)
  ] | order(_createdAt desc) [$start...$end] {
    ${serviceFields}
  }
`

// 3. Get total count for pagination metadata
export const SERVICES_COUNT_QUERY = groq`
  count(*[_type == "service" 
    && ($featured == null || featured == $featured)
  ])
`

// Lightweight cards query (landing pages, dropdown navigation)
export const SERVICE_CARDS_QUERY = groq`
  *[_type == "service"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    ${imageFields}
  }
`

/* // Single service by slug: pass { slug } as a param when fetching
export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    ${serviceFields}
  }
` */