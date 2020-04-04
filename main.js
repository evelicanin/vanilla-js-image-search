
// pixabay API Example
// const API_URL = 'https://pixabay.com/api/?key=15891799-399e645c8d2f21f2298b75856&q=yellow+flowers&image_type=photo&pretty=true';

const API_URL = 'https://pixabay.com/api/?key=15891799-399e645c8d2f21f2298b75856&image_type=photo&pretty=true';

const form = document.querySelector('form');                        // get the first form in the html document
const input = document.querySelector('input');                      // get the form input element
const loadingImage = document.querySelector('#loadingImage');       // get the loading gif image
const imageSection = document.querySelector('.images');             // get the search results container

loadingImage.style.display = 'none';                                // hide the loading gif

form.addEventListener('submit', formSubmitted);                     // add an event listener tot the form element



// eventListener will trigger this function
function formSubmitted(event) {

  event.preventDefault();                                           // prevent page reload - thats form default
  const searchTerm = input.value;                                   // get the value of the form input element
  // console.log(searchTerm);                                       // log the search input to the console

  // var x = document.getElementById("myDIV").childElementCount;
  var x = document.querySelector('.images').childElementCount;
  console.log(x);

  if (x == 0)                                                         // first search that the user performs
  {
    // call the search function - function returns a promise
    search(searchTerm)
      .then(displayImages);                                           // call the displayImages function
  }
  else {                                                              // for every other search, except the first
    imageSection.innerHTML = '';                                      // we clear the results container of the previous search

    // call the search function - function returns a promise          // and then call the search function again
    search(searchTerm)
      .then(displayImages);                                           // call the displayImages function
  }

}



// search function
function search(searchTerm) {
  const url = `${API_URL}&q=${searchTerm}`;                         // append search term to API_URL - see pixabay docs for q
  console.log(url);                                                 // log url to console to see if its correct
  loadingImage.style.display = '';                                  // hide the lading image
  return fetch(url)                                                 // fetch data - resposne is a JSON object - log results to the console
    .then(response => response.json()
      .then(result => {
        console.log(result);
        return result.hits;
      })
    )
}



// function for image display
function displayImages(images) {

  console.log(images);                                               // log the response(images) to the console

  // for eaxh image : create a link element (<a>)
  // add an img element (<img>) to the (<a>) element
  // that opens in a new window
  // we have to create something like this
  //  <a href="https:..." target="_blank">
  //    <img src="https:...">
  //  </a>


  images.forEach(image => {
    const imageLink = document.createElement('a');                   // create an <a> element
    imageLink.href = image.pageURL;                                  // set the href of the a to the pageURL that you get from the response
    imageLink.target = '_blank';                                     // property target opens the link in the new window
    const imageElement = document.createElement('img');              // create an <img> element
    imageElement.src = image.largeImageURL;                          // set the src atribute of the image to largeImageURL that you get from the response

    imageLink.appendChild(imageElement);                             // add image element to the link element
    imageSection.appendChild(imageLink);                             // add link element to the search results container
    // console.log(image.largeImageURL);                             // log the image url to the console
  });

  loadingImage.style.display = 'none';                               // hide the loading image

}



