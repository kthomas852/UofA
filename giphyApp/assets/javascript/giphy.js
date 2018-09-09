var gifs = [];

//renders the buttons to the page
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
  return
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
    var imageUrl = response.data.images.original_still.url;
    var gifImage = $("<img>");
    gifImage.addClass('gif');
    gifImage.attr("src", imageUrl);
    gifImage.attr("alt", "Gif image");
    gifImage.attr('data-animate', response.data.image_original_url);
    gifImage.attr('data-still', imageUrl);
    gifImage.attr('data-status', 'still');
    
    //
    $("#images").append(gifImage);
    gifClick();
  });
});
};

//Activates image Gif based on status
function gifClick(){
$('.gif').unbind().click(function(){
  let state = $(this).attr('data-status');
  let animate = $(this).attr('data-animate');
  let still = $(this).attr('data-still');
  console.log(state);
  if(state === 'still'){
    state = 'animate';
    $(this).attr('data-status', state);
    $(this).attr('src', animate);
  }else if(state === 'animate'){
    state = 'still';
    $(this).attr('data-status', state);
    $(this).attr('src', still);
  }
});
};

//Main listening events for buttons and input
$('document').ready(function(){
  console.log('Ready for Action!');
  $('#add-gif').click(function(){
    let gTemp = $('#gif-input').val().trim();
    gifs.push(gTemp);
    $('#gif-input').val('');
    renderButtons();
  });
console.log('Done');
});