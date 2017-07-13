var express = require('express');
var router = express.Router();  //Need .Router() to handle this router
var pg = require('pg');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

// Send all pets to client from DB using GET request
router.get('/getPets', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // **** NEED DATABASE QUERY HERE ****
      var queryText = '"pets"."color", "visits"."check_in_status" FROM owners JOIN pets ON "owners"."id" = "pets"."owner_id" JOIN visits ON "pets"."owner_id" = "visits"."pets_id";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({pets: result.rows});
          // ***** DOUBLE CHECK ORDER OF ITEMS IN THE OBJECT *****
          // owner, name, breed, color
          // ***** FIX FOR CLIENT-SIDE IF NECESSARY *****
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET

// Send all customers to client from DB using GET request
router.get('/getCustomers', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // **** NEED DATABASE QUERY HERE ****
      var queryText = 'SELECT ("last_name", "first_name") FROM owners;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({customers: result.rows});
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
      var pet = req.body;
      var ownerID = pet.owner;  //Need the owner ID -- NOT name here
      var name = pet.name;
      var breed = pet.breed;
      var color = pet.color;
      // **** NEED DATABASE QUERY TEXT ****
      // adding a new pet, but we must make sure we link owner_id
      var queryText = 'INSERT INTO pets ("name", "breed", "color", "owner_id" ) VALUES ($1, $2, $3, $4);';
      db.query(queryText,[name, breed, color, owner], function(errorMakingQuery, result){
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
      var queryText = "INSERT INTO owners ('first_name', 'last_name') VAULES ($1, $2);";
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

// DELETE pet from DB
router.delete('/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      // **** NEED DATABASE QUERY TEXT ****
      var queryText = '';
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
          res.send({pets: result.rows});
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
      // **** NEED VARIABLES FROM CLIENT-SIDE ****
      var id = req.params.id;
      var updatedPet = req.body;
      var name = updatedPet.name;
      var breed = updatedPet.breed;
      var color = updatedPet.color;

      // **** NEED DATABASE QUERY HERE ****
      var queryText = 'UPDATE pets SET ("name", "breed", "color") = VALUES($1, $2, $3) WHERE "owner_id" = $4;';
      db.query(queryText,[name, breed, color, id], function(errorMakingQuery, result){
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

module.exports = router;
