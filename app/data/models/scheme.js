const schemeDB = (sequelize, DataTypes) => {
  const scheme = sequelize.define('scheme', {
    schemeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    sourceSystem: DataTypes.STRING
  },
    {
      tableName: 'schemes',
      freezeTableName: true,
      timestamps: false
    })
  return scheme
}

module.exports = schemeDB
