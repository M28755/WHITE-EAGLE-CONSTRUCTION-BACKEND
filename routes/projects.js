import express from 'express'
import { sanityClient } from '../sanity/client.js'
import {
  PROJECTS_QUERY,
  PROJECTS_COUNT_QUERY,
  PROJECT_BY_SLUG_QUERY,
  FEATURED_PROJECTS_QUERY,
} from '../queries/projects.js'


const router = express.Router()

/**
 * @route   GET /api/projects
 * @desc    Fetch all projects with optional filtering & pagination
 * @query   category, status, featured, page, limit
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const start = (page - 1) * limit
    const end = start + limit


    const params = {
      category: req.query.category || null,
      status: req.query.status || null,
      featured: req.query.featured ? req.query.featured === 'true' : null,
      start,
      end,
    }

    const [projects, total] = await Promise.all([
      sanityClient.fetch(PROJECTS_QUERY, params),
      sanityClient.fetch(PROJECTS_COUNT_QUERY, params),
    ])

    res.status(200).json({
      success: true,
      data: projects,
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
      message: 'Failed to fetch projects',
      error: error.message,
    })
  }
   
})

/**
 * @route   GET /api/projects/featured
 * @desc    Fetch featured projects for homepage/landing sections
 * @query   limit
 */
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 6
    const projects = await sanityClient.fetch(FEATURED_PROJECTS_QUERY, { limit })

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured projects',
      error: error.message,
    })
  }
})

/**
 * @route   GET /api/projects/:slug
 * @desc    Fetch single project details by slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const project = await sanityClient.fetch(PROJECT_BY_SLUG_QUERY, { slug })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with slug '${slug}' not found`,
      })
    }

    res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project details',
      error: error.message,
    })
  }
})

export default router