import 'dotenv/config'



const SANITY_PROJECT_ID='uvvrx6we'
const SANITY_DATASET='production'
const SANITY_API_VERSION='2026-01-01'



export const sanityConfig = {
  projectId:SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion:SANITY_API_VERSION,
  useCdn: true,

  
}