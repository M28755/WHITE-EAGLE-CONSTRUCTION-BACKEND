import express from 'express'
import cors from "cors"
import projectsRoutes from "./routes/projects.js"
 import servicesRoute from "./routes/servicesRoutes.js"
import teamRoute from "./routes/teamRoutes.js"
import testimonial from "./routes/testimonialRoutes.js"

const app = express()

const PORT = process.env.PORT || 5000

//allow request from frontend
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is responding!'
    });
});

http://localhost:5000/api/health
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'White Eagle API is running',
  })
})

console.log(projectsRoutes)

//http://localhost:5000/api/projects
app.use('/api/projects', projectsRoutes)


//http://localhost:5000/api/services
app.use('/api/services', servicesRoute);


//http://localhost:5000/api/team
app.use('/api/team', teamRoute)

//http://localhost:5000/api/testimonial
app.use('/api/testimonial', testimonial)


app.listen(PORT, () => {
  console.log(`White Eagle server running on http://localhost:${PORT}`)
})