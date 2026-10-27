import dotenv from 'dotenv'
dotenv.config()
 
const SANITY_PROJECT_ID= process.env.SANITY_PROJECT_ID
const SANITY_DATASET= process.env.SANITY_DATASET
const SANITY_API_VERSION= process.env.SANITY_API_VERSION
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN


export const sanityConfig = {
  projectId:SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion:SANITY_API_VERSION,
  useCdn: false,
  token: SANITY_API_TOKEN

  
}