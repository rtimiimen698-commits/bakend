const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Le nom complet est obligatoire'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'L\'adresse email est obligatoire'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    workshop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workshop',
      required: [true, 'L\'atelier associé est obligatoire']
    },
    workshopTitle: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Confirmé', 'En attente', 'Annulé'],
      default: 'Confirmé'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Participant', participantSchema)
