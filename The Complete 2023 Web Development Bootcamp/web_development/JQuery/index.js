$("h1").addClass("big-title margin-50");
$("h1").text("Bye");

// InnerHTML
$("button").html("<em>Hey</em>");

// Attributes
$("a").attr("href", "https://www.youtube.com");

$("h1").click( function() {
  $("h1").css("color", "purple");
} );

// Event Listener
$("button").click( function() {
  $("h1").css("color", "purple");
});

$("input").keypress( function(event) {
  console.log(event.key);
  $("h1").text(event.key);
});

$(document).keypress( function(event) {
  console.log(event.key);
  $("h1").text(event.key);
});

// Replace .keypress
$("h1").on("mouseover", function() {
  $("h1").css("color", "red");
});
