const { Model, DataTypes } = require('sequelize');


// SMS | E-Mail | Push Notification

class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },    
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Notification;
