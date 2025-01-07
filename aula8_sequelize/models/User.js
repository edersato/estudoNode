var { DataTypes } = require('sequelize');

var db = require('../db/conn');

var User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        required: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    }
});

module.exports = User;