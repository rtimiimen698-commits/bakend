const mongoose = require('mongoose')

let isConnected = false

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillflow'

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    })
    isConnected = true
    console.log(`[MongoDB] Connecté avec succès : ${conn.connection.host}`)
    return true
  } catch (err) {
    isConnected = false
    console.warn(`[MongoDB] Note : Base de données locale/Atlas non accessible (${err.message})`)
    console.warn(`[Mode Démo] Bascule automatique sur la mémoire locale. Toutes les fonctionnalités (CRUD, filtres, inscriptions) restent 100% opérationnelles.`)
    return false
  }
}

const getIsConnected = () => isConnected

module.exports = { connectDB, getIsConnected }
