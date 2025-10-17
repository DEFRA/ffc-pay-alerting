module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    contactId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    emailAddress: DataTypes.STRING,
    addedBy: DataTypes.STRING,
    addedAt: DataTypes.DATE,
    removedBy: DataTypes.STRING,
    removedAt: DataTypes.DATE,
    BATCH_REJECTED: DataTypes.ARRAY(DataTypes.INTEGER),
    BATCH_QUARANTINED: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_REJECTED: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_DAX_REJECTED: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_INVALID_BANK: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_PROCESSING_FAILED: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_SETTLEMENT_UNSETTLED: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_SETTLEMENT_UNMATCHED: DataTypes.ARRAY(DataTypes.INTEGER),
    RESPONSE_REJECTED: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_REQUEST_BLOCKED: DataTypes.ARRAY(DataTypes.INTEGER),
    PAYMENT_DAX_UNAVAILABLE: DataTypes.ARRAY(DataTypes.INTEGER),
    RECEIVER_CONNECTION_FAILED: DataTypes.ARRAY(DataTypes.INTEGER),
    DEMOGRAPHICS_PROCESSING_FAILED: DataTypes.ARRAY(DataTypes.INTEGER),
    DEMOGRAPHICS_UPDATE_FAILED: DataTypes.ARRAY(DataTypes.INTEGER),
    EVENT_SAVE_ALERT: DataTypes.ARRAY(DataTypes.INTEGER),
    TABLE_CREATE_ALERT: DataTypes.ARRAY(DataTypes.INTEGER)
  },
  {
    tableName: 'contacts',
    freezeTableName: true,
    timestamps: false
  })
  return contact
}
