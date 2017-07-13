var express = require('express');
var router = express.Router();  //Need .Router() to handle this router
var pg = require('pg');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

// Send all pets to client from DB using GET request
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // **** NEED DATABASE QUERY HERE ****
      var queryText = ' ';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({pets: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET

//Add NEW PET to the database w/ POST request
router.post('/newPet', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // **** NEED VARIABLES FROM CLIENT-SIDE ****
      // **** NEED DATABASE QUERY TEXT ****
      db.query(queryText,[$1, $2, $3], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({pets: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of POST

//Add NEW CUSTOMER to the database w/ POST request
router.post('/newCustomer', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // **** NEED VARIABLES FROM CLIENT-SIDE ****
      var customer = req.body;
      var first_name = customer.first_name;
      var last_name = customer.last_name;
      // **** NEED DATABASE QUERY TEXT ****
      var dbText = "INSERT INTO owners ('first_name', 'last_name') VAULES ($1, $2);";
      db.query(queryText,[first_name, last_name], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({customers: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of POST

// DELETE task from DB
router.delete('/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      // **** NEED DATABASE QUERY TEXT ****
      var queryText = 'DELETE FROM "todos" WHERE "id"=$1;';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of DELETE

// Mark pet as CHECKED IN completed in DB
router.put('/checkin/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      // **** NEED DATABASE QUERY HERE ****
      var queryText = ' ';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({pets: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT

// Mark pet as CHECKED OUT in DB
router.put('/checkout/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      // **** NEED DATABASE QUERY HERE ****
      var queryText = ' ';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT

// Update pet in DB
router.put('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      // **** NEED VARIABLES FROM CLIENT-SIDE ****
      // **** NEED DATABASE QUERY HERE ****
      var queryText = ' ';
      db.query(queryText,[id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
            // console.log(queryText);
          res.send({todos: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of PUT

module.exports = router;
