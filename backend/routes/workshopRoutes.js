const express = require('express')
const router = express.Router()

const {
  getWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getStatsSummary
} = require('../controllers/workshopController')

// Routes spécifiques
router.get('/stats/summary', getStatsSummary)

// Routes CRUD Ateliers
router.get('/', getWorkshops)
router.get('/:id', getWorkshopById)
router.post('/', createWorkshop)
router.put('/:id', updateWorkshop)
router.delete('/:id', deleteWorkshop)

module.exports = router
