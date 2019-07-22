const input = document.getElementById("input");
const flickrAPI =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1";

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

$("#searchButton").click(function() {
  const flickrOptions = {
    api_key: "73bd9de7c710c577822447abb62f1ced",
    per_page: 25,
    tags: input.value,
    format: "json",
    safe_search: 1
  };
  $.getJSON(flickrAPI, flickrOptions, displayPhotos);
});

$(".toggle").click(function() {
  $(".photo-container").toggleClass("photo-container-full");

  if ($(".photos").find(".photo-container-full").length) {
    $(".toggle").text("image tiles");
  } else {
    $(".toggle").text("full width images");
  }
});

$(".btt").click(function() {
  btt();
});

function displayPhotos(data) {
  btt();
  if (data.photos == undefined || data.photos.photo.length < 1) {
    var errorHTML =
      "<p class='error'>Sorry, no photos found with that tag.</p>";
  } else {
    var photoHTML = "<ul class='photos'>";
    $.each(data.photos.photo, function(i, photo) {
      photoHTML += `
          <li class='photo-container'>
            <a href="https://farm${photo.farm}.staticflickr.com/${
        photo.server
      }/${photo.id}_${
        photo.secret
      }.jpg" rel="noopener noreferrer" target="_blank">
              <img src="https://farm${photo.farm}.staticflickr.com/${
        photo.server
      }/${photo.id}_${photo.secret}.jpg">
            </a>
          </li>
        `;
    });
    photoHTML += "</ul>";
  }
  $("#photos-container").html(errorHTML || photoHTML);
}

function btt() {
  window.scrollTo(0, 0);
}
