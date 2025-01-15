var { DataTypes } = require('sequelize')

var db = require('../db/conn')

var User = require('./User')

var Address = db.define('Address', {
    street: {
        type: DataTypes.STRING,
        required: true,
    },
    number: {
        type: DataTypes.STRING,
        required: true,
    },
    city: {
        type: DataTypes.STRING,
        required: true,
    }
})

User.hasMany(Address)
Address.belongsTo(User)

module.exports = Address