const mongoose = require('mongoose');
async function mongoDbConnection(dbUrl){
    mongoose.connect(dbUrl)
}
module.exports = {
    mongoDbConnection
};