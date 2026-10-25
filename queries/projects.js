import groq  from 'groq' 


// Reusable projection matching your schema fields
const projectFields =`
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  description,
  category,
  status,
  location,
  client,
  architect,
  startDate,
  completionDate,
  featured,
  "featuredImage": {
    "url": featuredImage.asset->url,
    "alt": featuredImage.alt,
    "metadata": featuredImage.asset->metadata
  },
  "relatedProjects": relatedProjects[]->{
    _id,
    title,
    "slug": slug.current,
    category,
    "featuredImage": {
      "url": featuredImage.asset->url,
      "alt": featuredImage.alt
    }
  }
`

// Get paginated list with optional category & status filtering
export const PROJECTS_QUERY = groq`
  *[_type == "project" 
    && ($category == null || category == $category)
    && ($status == null || status == $status)
    && ($featured == null || featured == $featured)
  ] | order(startDate desc) [$start...$end] {
    ${projectFields}
  }
`

// Get total count for pagination metadata
export const PROJECTS_COUNT_QUERY = groq`
  count(*[_type == "project" 
    && ($category == null || category == $category)
    && ($status == null || status == $status)
    && ($featured == null || featured == $featured)
  ])
`

// Get single project by slug
export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`

// Get featured projects
export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(startDate desc) [0...$limit] {
    ${projectFields}
  }
`