const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true});

module.exports = mongoose;
