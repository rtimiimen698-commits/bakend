const Workshop = require('../models/Workshop')
const { getIsConnected } = require('../config/db')
const { initialWorkshops } = require('../data/seedData')

// Mémoire de secours en cas d'absence de serveur MongoDB actif
let localWorkshops = initialWorkshops.map((w, index) => ({
  _id: `ws_${index + 1}`,
  ...w,
  createdAt: new Date()
}))

// Récupérer tous les ateliers avec filtres optionnels
const getWorkshops = async (req, res) => {
  try {
    const { category, level, search, status } = req.query

    if (getIsConnected()) {
      let query = {}
      if (category && category !== 'Toutes') query.category = category
      if (level && level !== 'Tous') query.level = level
      if (status && status !== 'Tous') query.status = status
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { instructor: { $regex: search, $options: 'i' } }
        ]
      }
      const workshops = await Workshop.find(query).sort({ date: 1 })
      return res.status(200).json(workshops)
    }

    // Fallback mémoire locale
    let filtered = [...localWorkshops]
    if (category && category !== 'Toutes') {
      filtered = filtered.filter(w => w.category === category)
    }
    if (level && level !== 'Tous') {
      filtered = filtered.filter(w => w.level === level)
    }
    if (status && status !== 'Tous') {
      filtered = filtered.filter(w => w.status === status)
    }
    if (search) {
      const term = search.toLowerCase()
      filtered = filtered.filter(
        w => w.title.toLowerCase().includes(term) || w.instructor.toLowerCase().includes(term)
      )
    }

    return res.status(200).json(filtered)
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des ateliers', error: error.message })
  }
}

// Récupérer un atelier par son ID
const getWorkshopById = async (req, res) => {
  try {
    const { id } = req.params

    if (getIsConnected()) {
      const workshop = await Workshop.findById(id)
      if (!workshop) {
        return res.status(404).json({ message: 'Atelier non trouvé' })
      }
      return res.status(200).json(workshop)
    }

    const workshop = localWorkshops.find(w => w._id === id)
    if (!workshop) {
      return res.status(404).json({ message: 'Atelier non trouvé' })
    }
    return res.status(200).json(workshop)
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

// Ajouter un nouvel atelier
const createWorkshop = async (req, res) => {
  try {
    const { title, instructor, category, level, format, location, date, time, duration, maxParticipants, description } = req.body

    if (!title || !instructor || !date) {
      return res.status(400).json({ message: 'Veuillez remplir les champs obligatoires (titre, formateur, date)' })
    }

    const newWorkshopData = {
      title,
      instructor,
      category: category || 'Communication',
      level: level || 'Intermédiaire',
      format: format || 'Présentiel',
      location: location || 'Salle B2 - Soft Skills',
      date,
      time: time || '14:00',
      duration: Number(duration) || 3,
      maxParticipants: Number(maxParticipants) || 15,
      registeredCount: 0,
      description: description || '',
      status: 'Planifié'
    }

    if (getIsConnected()) {
      const savedWorkshop = await Workshop.create(newWorkshopData)
      return res.status(201).json(savedWorkshop)
    }

    const created = {
      _id: `ws_${Date.now()}`,
      ...newWorkshopData,
      createdAt: new Date()
    }
    localWorkshops.unshift(created)
    return res.status(201).json(created)
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la création de l\'atelier', error: error.message })
  }
}

// Mettre à jour un atelier
const updateWorkshop = async (req, res) => {
  try {
    const { id } = req.params

    if (getIsConnected()) {
      const updated = await Workshop.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
      if (!updated) {
        return res.status(404).json({ message: 'Atelier introuvable' })
      }
      return res.status(200).json(updated)
    }

    const index = localWorkshops.findIndex(w => w._id === id)
    if (index === -1) {
      return res.status(404).json({ message: 'Atelier introuvable' })
    }

    localWorkshops[index] = {
      ...localWorkshops[index],
      ...req.body
    }
    return res.status(200).json(localWorkshops[index])
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la modification', error: error.message })
  }
}

// Supprimer un atelier
const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.params

    if (getIsConnected()) {
      const deleted = await Workshop.findByIdAndDelete(id)
      if (!deleted) {
        return res.status(404).json({ message: 'Atelier introuvable' })
      }
      return res.status(200).json({ message: 'Atelier supprimé avec succès', id })
    }

    const index = localWorkshops.findIndex(w => w._id === id)
    if (index === -1) {
      return res.status(404).json({ message: 'Atelier introuvable' })
    }

    localWorkshops.splice(index, 1)
    return res.status(200).json({ message: 'Atelier supprimé avec succès', id })
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message })
  }
}

// Statistiques pour le tableau de bord
const getStatsSummary = async (req, res) => {
  try {
    let workshops = []
    if (getIsConnected()) {
      workshops = await Workshop.find()
    } else {
      workshops = localWorkshops
    }

    const totalWorkshops = workshops.length
    const totalRegistered = workshops.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0)
    const totalCapacity = workshops.reduce((acc, curr) => acc + (curr.maxParticipants || 1), 0)
    const occupancyRate = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0

    // Répartition par catégorie
    const categoriesCount = {}
    workshops.forEach(w => {
      categoriesCount[w.category] = (categoriesCount[w.category] || 0) + 1
    })

    return res.status(200).json({
      totalWorkshops,
      totalRegistered,
      occupancyRate,
      categoriesCount
    })
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors du calcul des statistiques', error: error.message })
  }
}

// Fonction pour synchroniser les inscriptions avec le compteur de l'atelier
const adjustRegisteredCount = (workshopId, delta) => {
  const item = localWorkshops.find(w => w._id === workshopId || w.title === workshopId)
  if (item) {
    item.registeredCount = Math.max(0, (item.registeredCount || 0) + delta)
    if (item.registeredCount >= item.maxParticipants) {
      item.status = 'Complet'
    } else if (item.status === 'Complet') {
      item.status = 'Planifié'
    }
  }
}

module.exports = {
  getWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getStatsSummary,
  adjustRegisteredCount,
  localWorkshops
}
