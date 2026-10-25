import  groq  from 'groq'

// Reusable projection matching schema fields
export const testimonialFields = `
  _id,
  _createdAt,
  _updatedAt,
  quote,
  rating,
  person,
  position,
  displayOrder
`

// 1. Get all testimonials ordered by displayOrder
export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(displayOrder asc, _createdAt desc) {
    ${testimonialFields}
  }
`

// 2. Get featured testimonials only (e.g., for homepage slider/carousel)
export const FEATURED_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(displayOrder asc) [0...$limit] {
    ${testimonialFields}
  }
`


