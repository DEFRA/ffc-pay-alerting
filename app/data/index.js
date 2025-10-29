const fs = require('node:fs')
const path = require('node:path')
const { Sequelize, DataTypes } = require('sequelize')
const { databaseConfig } = require('../config')
const modelPath = path.join(__dirname, 'models')
const db = {}

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig)

const extensionLengthToTrim = -3

const files = fs.readdirSync(modelPath).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(extensionLengthToTrim) === '.js')
})

for (const file of files) {
  const model = require(path.join(modelPath, file))(sequelize, DataTypes)
  db[model.name] = model
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
