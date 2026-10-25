import express from 'express'

import { ALL_TESTIMONIALS_QUERY } from '../queries/testimonialQueries.js';
import { sanityClient } from '../sanity/client.js'

const router = express.Router();


router.get('/', async(req, res) =>{
  try {
    const testimonial = await Promise.all([
        sanityClient.fetch(ALL_TESTIMONIALS_QUERY)
    ])

    res.status(200).json({
        success:true,
        data:testimonial
    })
    
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
    
  }


})

export default router