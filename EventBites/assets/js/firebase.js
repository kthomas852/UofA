// Initialize Firebase
var config = {
  apiKey: "AIzaSyAYYbNueEYb7C_bwMGyqCZsyDYTlA3FkiM",
  authDomain: "mostrecentuser-8cc80.firebaseapp.com",
  databaseURL: "https://mostrecentuser-8cc80.firebaseio.com",
  projectId: "mostrecentuser-8cc80",
  storageBucket: "mostrecentuser-8cc80.appspot.com",
  messagingSenderId: "120315576403"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var email = "";
var password = "";
var userEmail = "";
var tbodyTablaItems = $('#display-item');

$(".sign-in-btn").on("click", function() {
  // $(".sign-in-btn").toggleClass( 'active' );
  // $(".sign-in-section").slideToggle("slow");
});
$(".sign-up-btn").on("click", function() {
  // $(".sign-up-btn").toggleClass( 'active' );
  // $(".sign-up-section").slideToggle("slow");
});
$("#btnLogin").on("click", function() {
  $("#loginPage").hide();
  $('#mainPage').show();
});
$("#btnSignup").on("click", function() {
  $("#loginPage").hide();
  $('#mainPage').show();
});
$("#btnLogout").on("click", function() {
  $("#loginPage").show();
  $('#mainPage').hide();
  $('#res').slideUp('medium');
  $('#food').slideUp('medium');
});
$("#back").on("click", function() {
  $("#loginPage").show();
  $('#mainPage').hide();
  $('#res').slideUp('medium');
  $('#food').slideUp('medium');
});

// Add login event, with callback function e.
function signIn(e) {
  e.preventDefault();
	email = $("#loginEmail").val();
	password = $("#loginPassword").val();
	var auth = firebase.auth();
	auth.signInWithEmailAndPassword(email, password).catch(function(error) {

    var errorCode = error.code;
    if (errorCode == 'auth/invalid-email') {
      $("#loginPage").show();
      $('#mainPage').hide();
      alert("The email address or password is not valid.");
      $("#loginEmail").val("");
      $("#loginPassword").val("");
    } else {
      $("#loginEmail").val("");
      $("#loginPassword").val("");
    }
  });
	// promise.catch(e => console.log(e.message));

};

// Add signup event, with callback function e.
function signUp(e) {
  e.preventDefault();
	email = $("#signUpEmail").val();
	password = $("#signUpPassword").val();
  if (!password || password.length < 6) {
    $("#loginPage").show();
    $('#mainPage').hide();
    alert("The password must be at least six characters.");
    $("#signUpEmail").val("");
    $("#signUpPassword").val("");
  }
	var auth = firebase.auth();
	auth.createUserWithEmailAndPassword(email, password).catch(function(error) {



    var errorCode = error.code;
    if (errorCode == 'auth/invalid-email') {
      $("#loginPage").show();
      $('#mainPage').hide();
      alert("The email address is badly formatted.");
      $("#signUpEmail").val("");
      $("#signUpPassword").val("");
    } else {
      $("#signUpEmail").val("");
      $("#signUpPassword").val("");
    }

  });

};

// Add logout event, with callback function e.
function logout(e) {
	firebase.auth().signOut();
	console.log("Logged out.")
  userEmail = "";
  $("#display-item").hide();
  $("#display-item").empty();
  $("#loginPage").show();
  $('#mainPage').hide();
  $("#signUpEmail").val("");
  $("#signUpPassword").val("");
  $("#loginEmail").val("");
  $("#loginPassword").val("");

};

// Add a real-time authentication listener.
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log("Logged in as: " + firebaseUser["email"]);
		console.log(firebaseUser);
		// $("#btnLogout").removeClass("hide");
		$("#btnLogout").show();
		$("#back").hide();
    $("#display-item").show();
    var email = firebaseUser["email"];
    console.log("Check: " + email);
    userEmail = email.slice(0, -4);
    console.log("Check: " + userEmail);
    $('#saved-food').show();
    showItems(userEmail);
    $('.save-btn').show();
    // $("input[type='submit']").show();

    database.ref().child("/users/"+userEmail+"/restaurants").on('value', function(snapshot) {
      var exists = snapshot.val();
      if (exists == null) {
        $('#saved-food').hide();
      } else {
        $('#saved-food').show();
      }
    });
	}
	else {
		console.log("Not logged in.")
    $('#saved-food').hide();
    $("#btnLogout").hide();
    $("#back").show();
    $('.save-btn').hide();
    $('.save-btn').empty();
    // $("input[type='submit']").hide();
	}
});


function showItems(userEmail) {
  database.ref().child("/users/"+userEmail+"/restaurants").on('value', function(snapshot) {
    var dataItems = snapshot.val();
    var showEachItem = '';

    for (var key in dataItems) {
      showEachItem += '<tr>' +
        '<td class="c tbkgnd text-dark">' + dataItems[key].item1 + '</td>' +
        '<td class="c tbkgnd text-dark">' + dataItems[key].item2 + '</td>' +
        '<td class="c tbkgnd text-dark">' + dataItems[key].item3 + '</td>' +
        '<td class="c tbkgnd text-dark">' + dataItems[key].item4 + '</td>' +
        // '<td></td>' +
        '<td>' +
        '<button data-item="' + key + '" class="btn btn-danger delete">' +
        '<span <i class="fas fa-trash-alt"></i></span>' +
        '</button>' +
        '</td>' +
        '</tr>';
    }
    tbodyTablaItems.html(showEachItem);
  });
}

function action(e) {
  if (e.target.parentElement.tagName === 'BUTTON') {
    $(e.target.parentElement).hasClass('delete')
      deleteItem($(e.target.parentElement).data('item'));
  }
}

function deleteItem(strKey) {
  database.ref().child("/users/"+userEmail+"/restaurants").child(strKey).remove();
}

function saveItem(e) {
    e.preventDefault();
    database.ref().child("/users/"+userEmail+"/restaurants").push({
      item1: $(".item-name", this).text().trim(),
      item2: $(".item-location", this).text().trim(),
      item3: $(".item-open", this).text().trim(),
      item4: $(".item-rating", this).text().trim(),
    });
}


// Document Ready
$(document).ready(function() {
  $("#btnLogin").on("click", signIn);
  $("#btnSignup").on("click", signUp);
  $("#btnLogout").on("click", logout);
  $(document).on('click', '.form-items', saveItem);
  tbodyTablaItems.on('click', action);
});
