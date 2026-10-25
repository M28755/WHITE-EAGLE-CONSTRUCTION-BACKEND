import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client.js'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return source ? builder.image(source).url() : null
}