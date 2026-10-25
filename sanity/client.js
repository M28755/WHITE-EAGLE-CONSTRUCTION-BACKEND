import {createClient} from "@sanity/client"
import { sanityConfig } from "../config/sanity.js"

export const sanityClient = createClient(sanityConfig)