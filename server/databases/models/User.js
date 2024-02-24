/**
 * @author Herlangga Sefani {@link https://github.com/gaibz}
 * @package exsvel
 * @path server/databases/models/User.js
 */

'use strict';

const {
    Model,
    DataTypes
} = require('sequelize');

const {
    sequelize
} = require('./_config');

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
    // Define column here

    // Specific Mapping (I use unix timestamp everytime)
    createdAt: {
        type: DataTypes.INTEGER,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.INTEGER,
        field: 'updated_at',
    }
}, {
    sequelize,
    modelName: `User`,
    underscored: true, // should we use underscored?
    tableName: `users`,
    // If you dont use unix timestamp then just delete this hooks
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