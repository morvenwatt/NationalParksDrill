'use strict';


const apiKey = 'wWlz9YcwKP3F1Uz50AqaFc8KLT3XaQTWFT3Xzyvb'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');

// how to add stateCode=XX&limit=yy OR stateCode=XX&stateCode=XX&limit=yy
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[0].fullName}</h3>
      <p>${responseJson.data[0].description}</p>
      <p>${responseJson.data[0].states}</p>
      <p>'${responseJson.data[0].url}'</p>
      <p>'${responseJson.data[0].address}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults=10) {
  const params = {
    stateCode: '',
    maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString + '&api_key=' + apiKey;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchState, maxResults);
  });
}

$(watchForm);