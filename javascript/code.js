var config = {
  apiKey: "AIzaSyAYN3GmBrupuARfV6OUlaxH5MjyOONu8zQ",
  authDomain: "fiona-zhou.firebaseapp.com",
  databaseURL: "https://fiona-zhou.firebaseio.com",
  projectId: "fiona-zhou",
  storageBucket: "fiona-zhou.appspot.com",
  messagingSenderId: "582820725322",
  appId: "1:582820725322:web:e18d85535ed48e96"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var dest = "";
var freq;
var firstarrival;
var minsAway;


database.ref().on("child_added", function (snapshot) {

  var child = snapshot.val();

  var firstarrivalConverted = moment(child.firstarrival, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstarrivalConverted), "minutes");

  var tRemainder = (diffTime % child.freq);
  var tMinutesTillTrain = child.freq - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

  $("<tr><th>" + child.name + "</th><td>" + child.dest + "</td><td>" + child.freq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>").appendTo("tbody");

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#submit").on("click", function (event) {
  event.preventDefault();

  name = $("#train-name").val().trim();
  dest = $("#destination").val().trim();
  firstarrival = $("#first-train-time").val().trim();
  freq = $("#frequency").val().trim();

  $("#train-name").val();
  $("#destination").val();
  $("#first-train-time").val();
  $("#frequency").val();


  database.ref().push({
    name: name,
    dest: dest,
    freq: freq,
    firstarrival: firstarrival
  });
});
