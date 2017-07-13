$(document).ready(function() {
  console.log('JQ linked');
  //call getPets() on page load to display pet and cust info on DOM
  getPets();
  //click listeners...
  $('#userInput').on('click', '#newPetButton', addPet);
  $('#userInput').on('click', '#newCustomerButton', addCustomer);
  $('.petTable').on('click', '.deletePetButton', deletePet);
  $('.petTable').on('click', '.updatePetButton', updatePet);
  $('.petTable').on('click', '.checkInOutButton', checkInOut);
});//end onReady

//function to add new pet to db
function addPet() {
  var owner; // equal to vals of input fields in html
  var name;
  var breed;
  var color;
  $.ajax({
    type: 'POST',
    url: '/pets/newPet',
    data: {
      //user input from Alecia - new customer and pet info - owner, name, breed, color
      owner: owner, //concatenate first_name and last_name into single name
      name: name,
      breed: breed,
      color: color
    },
    success: function(response) {
      console.log(response); //message to verify info was sent to server
      getPets();
    }//end success
  });//end POST
}//end addPet

//function to add new owner to db
function addCustomer() {
  var first_name; // equal to vals of input fields in html
  var last_name;
  $.ajax({
    type: 'POST',
    url: '/pets/newCustomer',
    data: {
      first_name: first_name,
      last_name: last_name
    },
    success: function(response) {
      console.log('Info sent to server: ', response);
      getPets();
    }//end success
  });//end POST
}//end addCustomer

//function to delete (only) pet from db (not customer)
function deletePet() {
  var id; //set equal to id attached to the delete button clicked
  $.ajax({
    type: 'DELETE',
    utl: '/pets' + id,
    success: function(response) {
      console.log(response); //message to verify pet info to delete sent to server
      getPets();
    }//end success
  });//end DELETE
}//end deletePet

// Check in / check out button
// AJAX to mark checked in: PUT, url: "/pets/checkIn" + id
// data to send: pet id with the url

//function to update edited pet info in db
function updatePet() {
  var id; //set equal to id attached to the update button clicked
  $.ajax({
    type: 'PUT',
    url: '/pets' + id,
    success: function(response) {
      console.log(response); //retrieve updated pet info to display on DOM
      getPets();
    }//end success
  });//end PUT
}//end updatePet

// AJAX to mark checked out: PUT, url: "/pets/checkOut" + id
// data to send: pet id with the url

var checkInStatus = true;
//function to change check in/ out status of pet in db
function checkInOut() {
  var id; //set equal to id attached to button clicked
  if(checkInStatus) {
    $.ajax ({
      type: 'PUT',
      url: '/pets/checkout' + id,
      success: function(response) {
        console.log(response);
        checkInStatus = false;
      }//end success
    });//end PUT
  } else {
      $.ajax ({
        type: 'PUT',
        url: '/pets/checkin' + id,
        success: function(response) {
          console.log(response);
        }//end success
      });//PUT
    }//end if
}//end checkInOut

// function to retrieve current pet data from db to display on DOM
function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pets', //pet and owner info from server
    success: function(response) {
      console.log(response); //receive: owner, name, breed, color
      displayPets(response);
    }//end success
  });//end GET
}//end displayPets

//function to display pet info on DOM in table
function displayPets(petsFromDB) {
  console.log(petsFromDB);
  //append info on DOM
}//end displayPets
