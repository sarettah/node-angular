const MongoClient = require( 'mongodb' ).MongoClient;

var _db;

const url = "mongodb+srv://sarah:sarah@cluster0.so4te.gcp.mongodb.net/ToDo?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true  }, function( err, client ) {
      _db  = client.db('ToDo');
      console.log("db connectToServer: "+_db);
      return callback( err );
    } );
  },

  getDb: function() {
   console.log("db getDb: "+_db);
    return _db;
  }
};