$(document).ready(function() {
    
    ////////////////////User Types in Response/////////////////

    //create an array of animals
    var animals = ["fox", "turtle", "chameleon", "bee", "hummingbird"];

    // Function for displaying animal data
    function renderButtons(){

        // Deletes the animal buttons prior to adding new animal button so none of them repeat
        $("#animalView").empty();

        // Loops through the animal array
        for (var i = 0; i < animals.length; i++) {

            // Then dynamicaly generating buttons for each animal in the array.
            var a = $("<button>");
            a.addClass("animal"); //adds a class
            a.attr("data-name", animals[i]); //adds a data-attribute
            a.text(animals[i]); //gives text to the buttons
            // Adding the button to the HTML
            $("#animalView").prepend(a); //appends new buttons to animalView div
        }
    }

    /////////////////////// addAnimal Event /////////////////////

    // This function handles button event
    $("#addAnimal").on("click", function () {

        var animalInput = $("#animalInput").val().trim(); //grabs user input
        animals.push(animalInput); //add user input to array
        renderButtons(); //call renderButtons to make buttons for all the animals
        return false; //user can hit "enter" to submit response
    });


    ////////////////// Display Gifs (Quoth the Gify) ////////////////////////
    function showGifs() {
        var animalData = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalData + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({url: queryURL, method: "GET"}).done(function (response) { //AJAX request, maybe .then
            var results = response.data; //save results as a variable
                for (var i = 0; i < results.length; i++) { // Looping over every gif
                    var gifDiv = $("<div class='gif'>"); // Creates a div with the class "gifs"
                    var showGifs = $("<img>");
                    showGifs.attr("src", results[i].images.fixed_height_still.url);

                    ////////////////////////show rating on hover////////////////////
                    showGifs.attr("title", "Rating: " + results[i].rating);
                    showGifs.attr("data-still", results[i].images.fixed_height_still.url);
                    showGifs.attr("data-state", "still");
                    showGifs.addClass("gif");
                    showGifs.attr('data-animate', results[i].images.fixed_height.url);
                gifDiv.append(showGifs);
                $("#animalGifs").prepend(gifDiv);ß
            }
        });
}

////////////////// Animate Gifs /////////////////////
$(document).on("click", ".gif", function(){
    var goAnimate = $(this).attr("data-state");
        if (goAnimate == "still"){
            $(this).attr("src", $(this).data("animate"));
        }
        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
});

/////////////////// Show Gifs //////////////////////
$(document).on("click", ".animal", showGifs);

renderButtons();

});