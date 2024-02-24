'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const {sequelize} = require('./_config');

class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    createdAt: {
        type: DataTypes.INTEGER,
        field: 'created_at',
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.INTEGER,
        field: 'updated_at',
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    underscored: true,
    tableName: 'users',
    hooks: {
        beforeCreate: (record, options) => {
            record.dataValues.createdAt = Math.floor(Date.now() / 1000);
            record.dataValues.updatedAt = Math.floor(Date.now() / 1000);
        },
        beforeUpdate: (record, options) => {
            record.dataValues.updatedAt = Math.floor(Date.now() / 1000);
        }
    }
});

module.exports = User;