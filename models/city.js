const mongoose = require('mongoose');
const softDelete = require('mongoosejs-soft-delete');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: "State"
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

CitySchema.plugin(softDelete);
module.exports = mongoose.model('City', CitySchema);