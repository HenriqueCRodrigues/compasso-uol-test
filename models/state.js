const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const softDelete = require('mongoosejs-soft-delete');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    uf: {
        type: String,
        required: true,
        unique: true
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
StateSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('State', StateSchema);