var gifs = ["cats", "dogs"];

function renderButtons(){
  $('#button-area').html('');
  for (let i = 0; i < gifs.length; i++) {
    let element = $("<button>");
    element.addClass("selector");
    element.attr("data-name", gifs[i]);
    element.text(gifs[i]);
    $('#button-area').append(element);
  }
  clickButtons();
  console.log(gifs);
};

//Creates Gif based on button type selected
function clickButtons(){
$('.selector').click(function(){
  console.log('click');
  let gifTag = $(this).attr('data-name');
  console.log(gifTag);
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + gifTag;
  console.log('Cats a coming!');
  //AJAX query to get GIF images
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var imageUrl = response.data.image_original_url;
    var gifImage = $("<img>");
    gifImage.addClass('gif');
    gifImage.attr("src", imageUrl);
    gifImage.attr("alt", "Gif image");
    
    //
    $("#images").append(gifImage);
    clickGifs();
  });
});
};

//Activates image Gif based on status
function clickGifs(){
  $('.gif').click(function(){
    let state = $(this).attr();
    let animate = $(this).attr();
    let still = $(this).attr();
    if(state === 'still'){
      state = 'animate';
      $(this).attr(animate);
    }else if(state === 'animate'){
      state = 'still';
      $(this).attr(still);
    }
  });
};

//Main listening events for buttons and input
$('document').ready(function(){
  console.log('Ready for Action!');
$('#add-gif').click(function(){
  let gTemp = $('#gif-input').val().trim();
  gifs.push(gTemp);
  renderButtons();
});

console.log('Done');
});