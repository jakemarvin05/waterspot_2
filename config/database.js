/**
 * Created by techticsninja on 7/20/16.
 */
module.exports = {
    'url' : 'postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':5432/'+process.env.DB_NAME // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
};