const { Model, DataTypes } = require('sequelize');


// Sports | Finance | Movies

class Category extends Model {
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
          unique: true,
          allowNull: false,
        },    
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Category;
