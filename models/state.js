const mongoose = require('mongoose');
const softDelete = require('mongoosejs-soft-delete');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

StateSchema.plugin(softDelete);
module.exports = mongoose.model('State', StateSchema);