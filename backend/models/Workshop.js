const mongoose = require('mongoose')

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre de l\'atelier est obligatoire'],
      trim: true
    },
    instructor: {
      type: String,
      required: [true, 'Le nom du formateur / coach est obligatoire'],
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Communication',
        'Leadership',
        'Gestion du Temps',
        'Négociation & Pitch',
        'Intelligence Émotionnelle',
        'Travail en Équipe'
      ],
      default: 'Communication'
    },
    level: {
      type: String,
      enum: ['Débutant', 'Intermédiaire', 'Avancé'],
      default: 'Intermédiaire'
    },
    format: {
      type: String,
      enum: ['Présentiel', 'En ligne', 'Hybride'],
      default: 'Présentiel'
    },
    location: {
      type: String,
      default: 'Salle B2 - Espace Soft Skills'
    },
    date: {
      type: String,
      required: [true, 'La date est obligatoire']
    },
    time: {
      type: String,
      default: '14:00'
    },
    duration: {
      type: Number,
      default: 3
    },
    maxParticipants: {
      type: Number,
      default: 15,
      min: [1, 'La capacité minimale est de 1 participant']
    },
    registeredCount: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['Planifié', 'En cours', 'Complet', 'Terminé'],
      default: 'Planifié'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Workshop', workshopSchema)
