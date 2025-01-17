/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const followersArray = ['tetondan', 'dustinmyers','justsml','luishrd', 'bigknell'];
const cardSection = document.querySelector('cards');

//My Card
axios.get('https://api.github.com/users/CoreyGumbs')
.then(res => {

  let cards =  document.querySelector('.cards');
  cards.appendChild(githubCard(res.data));

}).catch(err => console.log(err));

//followers Array
followersArray.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)
  .then(res => {
  
    const cards = document.querySelector('.cards');
    cards.appendChild(githubCard(res.data));

  }).catch(err  => console.log(err));
});


///STRETCH DYNAMIC FOLLOWERS FUNCTION
const githubFollowers = (url) => {

  const dynamicFollowersArray = [];

  axios.get(url)
  .then(response => {

    response.data.forEach(item =>{ 
      dynamicFollowersArray.push(item.login);
    });

  }).then(() => {

    dynamicFollowersArray.forEach(user =>{

      axios.get(`https://api.github.com/users/${user}`)
      .then(res => {
        const cards = document.querySelector('.cards');
        cards.appendChild(githubCard(res.data));
      });

    })
  }).catch(err => console.log(err));
}

githubFollowers('https://api.github.com/users/CoreyGumbs/followers');

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const githubCard = (user) => {

  //create Elements
  const card = document.createElement('div');
  const cardImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const cardTitle = document.createElement('h3');
  const cardUserName = document.createElement('p');
  const cardLocation = document.createElement('p');
  const cardProfile = document.createElement('p');
  const cardProfileLink = document.createElement('a');
  const cardFollowers = document.createElement('p');
  const cardFollowing = document.createElement('p');
  const cardBio = document.createElement('p');

  //add Attributes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardTitle.classList.add('name');
  cardUserName.classList.add('username');

  //create Appending
  card.append(cardImg, cardInfo);
  cardInfo.append(cardTitle, cardUserName, cardLocation, cardProfile, cardFollowers, cardFollowing, cardBio);
  cardProfile.appendChild(cardProfileLink);

  //context
  cardImg.src = user.avatar_url;
  cardTitle.textContent = user.name;
  cardUserName.textContent = user.login;
  cardLocation.textContent = user.location;
  cardProfileLink.setAttribute('href', `${user.html_url}`);
  cardProfileLink.textContent = user.html_url;
  cardFollowers.textContent = user.followers;
  cardFollowing.textContent = user.following;
  cardBio.textContent = user.bio;

  return card;
}