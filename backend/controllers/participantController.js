const Participant = require('../models/Participant')
const Workshop = require('../models/Workshop')
const { getIsConnected } = require('../config/db')
const { initialParticipants } = require('../data/seedData')
const { adjustRegisteredCount } = require('./workshopController')

// Données mémoire de secours
let localParticipants = initialParticipants.map((p, index) => ({
  _id: `part_${index + 1}`,
  ...p,
  createdAt: new Date()
}))

// Obtenir tous les participants
const getParticipants = async (req, res) => {
  try {
    const { workshopId } = req.query

    if (getIsConnected()) {
      let query = {}
      if (workshopId) query.workshop = workshopId
      const list = await Participant.find(query).sort({ createdAt: -1 })
      return res.status(200).json(list)
    }

    let result = [...localParticipants]
    if (workshopId) {
      result = result.filter(p => p.workshop === workshopId || p.workshopTitle === workshopId)
    }
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des participants', error: error.message })
  }
}

// Inscrire un nouveau participant
const registerParticipant = async (req, res) => {
  try {
    const { fullName, email, phone, workshopId, workshopTitle, notes } = req.body

    if (!fullName || !email) {
      return res.status(400).json({ message: 'Le nom et l\'adresse email sont requis' })
    }

    if (getIsConnected()) {
      // Vérifier si l'atelier existe
      const workshop = await Workshop.findById(workshopId)
      if (workshop) {
        if (workshop.registeredCount >= workshop.maxParticipants) {
          return res.status(400).json({ message: 'Désolé, cet atelier est déjà complet' })
        }
        workshop.registeredCount += 1
        if (workshop.registeredCount >= workshop.maxParticipants) {
          workshop.status = 'Complet'
        }
        await workshop.save()
      }

      const newParticipant = await Participant.create({
        fullName,
        email,
        phone: phone || '',
        workshop: workshopId,
        workshopTitle: workshop ? workshop.title : (workshopTitle || 'Atelier Soft Skills'),
        notes: notes || '',
        status: 'Confirmé'
      })

      return res.status(201).json(newParticipant)
    }

    // Gestion mémoire locale
    adjustRegisteredCount(workshopId || workshopTitle, 1)

    const newLocal = {
      _id: `part_${Date.now()}`,
      fullName,
      email,
      phone: phone || '',
      workshop: workshopId || 'ws_1',
      workshopTitle: workshopTitle || 'Atelier Soft Skills',
      notes: notes || '',
      status: 'Confirmé',
      createdAt: new Date()
    }
    localParticipants.unshift(newLocal)

    return res.status(201).json(newLocal)
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message })
  }
}

// Annuler ou supprimer une inscription
const cancelParticipant = async (req, res) => {
  try {
    const { id } = req.params

    if (getIsConnected()) {
      const part = await Participant.findById(id)
      if (!part) {
        return res.status(404).json({ message: 'Participant non trouvé' })
      }

      // Décrémenter le compteur de l'atelier associé
      if (part.workshop) {
        const workshop = await Workshop.findById(part.workshop)
        if (workshop && workshop.registeredCount > 0) {
          workshop.registeredCount -= 1
          if (workshop.status === 'Complet') {
            workshop.status = 'Planifié'
          }
          await workshop.save()
        }
      }

      await Participant.findByIdAndDelete(id)
      return res.status(200).json({ message: 'Inscription annulée avec succès', id })
    }

    const index = localParticipants.findIndex(p => p._id === id)
    if (index === -1) {
      return res.status(404).json({ message: 'Participant non trouvé' })
    }

    const removed = localParticipants.splice(index, 1)[0]
    adjustRegisteredCount(removed.workshop || removed.workshopTitle, -1)

    return res.status(200).json({ message: 'Inscription annulée avec succès', id })
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de l\'annulation', error: error.message })
  }
}

module.exports = {
  getParticipants,
  registerParticipant,
  cancelParticipant
}
