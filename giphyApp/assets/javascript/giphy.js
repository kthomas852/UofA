$('document').ready(function(){
$("#cat-button").click(function() {

    //
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=motivational";
    console.log('Cats a coming!');
    //
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    
    //
    .then(function(response) {
      
      //
      //console.log(response);
        var imageUrl = response.data.image_original_url;

        //
        var catImage = $("<img>");

        //
        catImage.attr("src", imageUrl);
        catImage.attr("alt", "cat image");

        //
        $("#images").html(catImage);
      });
  });
});