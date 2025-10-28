module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    contactId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    emailAddress: DataTypes.STRING,
    modifiedBy: DataTypes.STRING,
    modifiedAt: DataTypes.DATE,
    removedBy: DataTypes.STRING,
    removedAt: DataTypes.DATE,
    batch_rejected: DataTypes.ARRAY(DataTypes.INTEGER),
    batch_quarantined: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_rejected: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_dax_rejected: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_invalid_bank: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_processing_failed: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_settlement_unsettled: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_settlement_unmatched: DataTypes.ARRAY(DataTypes.INTEGER),
    response_rejected: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_request_blocked: DataTypes.ARRAY(DataTypes.INTEGER),
    payment_dax_unavailable: DataTypes.ARRAY(DataTypes.INTEGER),
    receiver_connection_failed: DataTypes.ARRAY(DataTypes.INTEGER),
    demographics_processing_failed: DataTypes.ARRAY(DataTypes.INTEGER),
    demographics_update_failed: DataTypes.ARRAY(DataTypes.INTEGER),
    event_save_alert: DataTypes.ARRAY(DataTypes.INTEGER),
    table_create_alert: DataTypes.ARRAY(DataTypes.INTEGER)
  },
  {
    tableName: 'contacts',
    freezeTableName: true,
    timestamps: false
  })
  return contact
}
