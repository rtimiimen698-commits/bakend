const express = require('express')
const router = express.Router()

const {
  getParticipants,
  registerParticipant,
  cancelParticipant
} = require('../controllers/participantController')

router.get('/', getParticipants)
router.post('/', registerParticipant)
router.delete('/:id', cancelParticipant)

module.exports = router
