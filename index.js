function displayResults(responseJson){
  // console.log(responseJson.data[i].fullName);
  // console.log(responseJson.data[i].description);
  // console.log(responseJson.data[i].url);
  // console.log(responseJson.data[0].addresses)

  for(let i = 0; i < responseJson.data.length;i++){
  
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</li></h3>
      <li><h3>${responseJson.data[i].description}</li></h3>
      <li><h3>${responseJson.data[i].url}</li></h3>
      <li><h3>${responseJson.data[i].addresses[1].line1}</li></h3>

      <li><h3>${responseJson.data[i].addresses[1].city}</li></h3>
      <li><h3>${responseJson.data[i].addresses[1].stateCode}</li></h3>
      <li><h3>${responseJson.data[i].addresses[1].postalCode}</li></h3>
    `)}
};



function gitApiCall(searchTerm,maxResults) {
  const apiKey = 'MEAzVWBfbzF1ToOAHlzET3atVThd7pZvmmobbopA';
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => {
        if (response.ok) {
        return response.json();
      }
      // DISPLAY ERRORS if the server connection works but the json data is broken
      throw new Error(response.statusText);
    })
    .then(responseJson => 
      displayResults(responseJson))
   .catch(error => console.log('Something went wrong. Try again later.',error));
};


function clearHTML(){
  $('#results-list').html('');
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#max-results').val();
    clearHTML();
    gitApiCall(searchTerm,maxResults);
  });
}

$(watchForm);

//User enters name into form (make sure form works)
//watch for submit button
//save search input into variable
//add variable to fetch URL
//fetch
//check for error
//send results to DOM