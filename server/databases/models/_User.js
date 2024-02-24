const { DataTypes } = require('sequelize');
const {sequelize} = require('./_config');

const _User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    underscored: true,
});

module.exports = _User;