const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to db before tests run
before(function(done){

    // Connect to mongodb
    mongoose.connect('mongodb://localhost:27017/kurio',{ useNewUrlParser: true });
    mongoose.connection.once('open', function(){
        console.log('Connection has been made, now make fireworks...');
        done();
    }).on('error', function(error){
        console.log('Connection error:', error);
    });

});
