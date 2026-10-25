import  groq from 'groq'

// Reusable projection matching schema fields
export const teamMemberFields = `
  _id,
  _createdAt,
  _updatedAt,
  name,
  position,
  "photo": {
    "url": photo.asset->url,
    "alt": photo.alt,
    
  },
  biography,
  qualifications,
  email,
  linkedin,
  displayOrder
`

// 1. Get all team members ordered by custom display order
export const ALL_TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(displayOrder asc, name asc) {
    ${teamMemberFields}
  }
`
// 2. Get paginated team members
export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(displayOrder asc, name asc) [$start...$end] {
    ${teamMemberFields}
  }
`

// 3. Count total team members
export const TEAM_MEMBERS_COUNT_QUERY = groq`
  count(*[_type == "teamMember"])
`