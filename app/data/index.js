const path = require('node:path')
const { Database } = require('ffc-database')
const { databaseConfig } = require('../config')
const modelPath = path.join(__dirname, 'models')

const database = new Database({ ...databaseConfig, modelPath })
const db = database.connect()

module.exports = db
