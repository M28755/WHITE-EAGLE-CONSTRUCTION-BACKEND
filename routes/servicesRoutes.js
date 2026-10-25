import express from 'express'

import { sanityClient } from '../sanity/client.js'
import {
    ALL_SERVICES_QUERY,
    SERVICES_QUERY
} from '../queries/servicesQueries.js'



const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 10
        const start = (page - 1) * limit
        const end = start + limit

        const params = {
            featured: req.query.featured ? req.query.featured === 'true' : null,
            start,
            end,
        }

        const [services, total] = await Promise.all([
            sanityClient.fetch(SERVICES_QUERY, params),
            //sanityClient.fetch(SERVICES_COUNT_QUERY, params),
        ])

        res.status(200).json({
            success: true,
            data: services,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        })

    }
})

export default router
