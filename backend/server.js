require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/db')

const workshopRoutes = require('./routes/workshopRoutes')
const participantRoutes = require('./routes/participantRoutes')

const app = express()

// Connexion base de données
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes API
app.use('/api/workshops', workshopRoutes)
app.use('/api/participants', participantRoutes)

// Route de statut / health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SkillFlow API opérationnelle',
    timestamp: new Date().toISOString()
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Serveur SkillFlow démarré sur http://localhost:${PORT}`)
})
