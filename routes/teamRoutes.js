import express from 'express'
import { sanityClient } from '../sanity/client.js'
import { 
    ALL_TEAM_MEMBERS_QUERY,TEAM_MEMBERS_QUERY,
     TEAM_MEMBERS_COUNT_QUERY,
      } from '../queries/teamQueries.js'


const router = express.Router()

router.get('/', async(req, res) =>{

    try {
      const page = parseInt(req.query.page, 10)
    const limit = parseInt(req.query.limit, 10)

    if (page && limit) {
      const start = (page - 1) * limit
      const end = start + limit

      const [members, total] = await Promise.all([
        sanityClient.fetch(TEAM_MEMBERS_QUERY, { start, end }),
        sanityClient.fetch(TEAM_MEMBERS_COUNT_QUERY),
      ])

      return res.status(200).json({
        success: true,
        data: members,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      })
    }

    // Default: Return all team members sorted
    const members = await sanityClient.fetch(ALL_TEAM_MEMBERS_QUERY)
    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
        
    }
})

export default router