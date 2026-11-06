require('dotenv').config()
const mongoose = require('mongoose')
const Workshop = require('../models/Workshop')
const Participant = require('../models/Participant')
const { initialWorkshops, initialParticipants } = require('./seedData')

const seedDatabase = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillflow'

  try {
    console.log('[Seed] Connexion à MongoDB...')
    await mongoose.connect(uri)

    console.log('[Seed] Nettoyage des anciennes données...')
    await Workshop.deleteMany({})
    await Participant.deleteMany({})

    console.log('[Seed] Insertion des ateliers...')
    const createdWorkshops = await Workshop.insertMany(initialWorkshops)

    console.log('[Seed] Insertion des participants...')
    const participantsWithIds = initialParticipants.map((p, index) => {
      const matched = createdWorkshops[index % createdWorkshops.length]
      return {
        ...p,
        workshop: matched._id,
        workshopTitle: matched.title
      }
    })
    await Participant.insertMany(participantsWithIds)

    console.log('✅ Base de données initialisée avec succès !')
    process.exit(0)
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation :', err.message)
    process.exit(1)
  }
}

seedDatabase()
