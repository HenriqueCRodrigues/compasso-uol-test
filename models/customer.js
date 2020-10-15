const mongoose = require('mongoose');
const softDelete = require('mongoosejs-soft-delete');

const CustomerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum : ['MALE','FEMALE', 'NOT_DECLARED'],
        default: 'NOT_DECLARED',
        required: true
    },
    age: {
        type: Number,
        required: true,
        integer: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City"
    },
    birthedAt: {
        type: Date,
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

CustomerSchema.plugin(softDelete);
module.exports = mongoose.model('Customer', CustomerSchema);