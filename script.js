'use scrict'
function getRepositories(username){
  fetch("https://api.github.com/users/"+username+"/repos")
  .then(response=>{
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  }).then(response=>displayData(response))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`)});
}
function displayData(repositories){
  repositories.forEach(repo =>{
   $('.repositories').append(`<li><p>${repo.name} <a href="${repo.html_url}" target="_blank">Link</a></p></li>`);
  });
}
function setUpForm(){
  $('form').on('submit',function(event){
    event.preventDefault();
    let username = $('#githubUsername').val();
    $("#user").text(username);
    $('.repositories').html("");
    getRepositories(username);
    $('.results').removeClass('hidden');
  });
}
$(setUpForm);