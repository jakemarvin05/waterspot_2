var databaseUrl = configDB.url;
var logging = process.env.DB_LOGGING ? console.log : false;

var cls = require('continuation-local-storage');
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var ssaclAttributeRoles = require('ssacl-attribute-roles');

Sequelize.cls = cls.createNamespace('sequelizeTransactionNameSpace');

var sequelize = new Sequelize(databaseUrl, {logging: logging});

var db = {};

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file.indexOf('.') !== -1) && (file !== 'index.js')
}).forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    var name = model.name;
    db[name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
});

//call db.[Model].sync() to sync only one model.
//db.Transaction.sync();
//sequelize.sync();

ssaclAttributeRoles(sequelize);
ssaclAttributeRoles(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.databaseUrl = databaseUrl;

module.exports = db;
