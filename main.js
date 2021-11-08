const boosterContainer = document.getElementById("booster-container");
const form = document.getElementById("form");

let saying = document.getElementById("saying");
let imageURL = document.getElementById("booster-img");
saying.value = "";
imageURL.value = "";

const boosterBaseURL = "http://localhost:4000/api/booster";

//Compliment data get
document.getElementById("complimentButton").addEventListener("click", () => {
  axios.get("http://localhost:4000/api/compliment/").then(function (response) {
    const data = response.data;
    alert(data);
  });
});

//Fortunate data get
document.getElementById("fortuneButton").addEventListener("click", () => {
  axios.get("http://localhost:4000/api/fortune/").then(function (response) {
    const data = response.data;
    alert(data);
  });
});

// requests for confidence boosters
const boosterCallBack = ({ data: boosters }) => {
  displayBoosters(boosters);
  console.log(boosters);
};

const getAllBoosters = () => {
  axios.get(boosterBaseURL).then(boosterCallBack);
};

const createBooster = (body) => {
  axios.post(boosterBaseURL, body).then(boosterCallBack);
};

const deleteBooster = (id) => {
  axios.delete(`${boosterBaseURL}/${id}`).then(boosterCallBack);
};

const updateBooster = (id, type) => {
  axios.put(`${boosterBaseURL}/${id}`, { type }).then(boosterCallBack);
};

// submit handler function for the confidence booster form
const submitHandler = (event) => {
  event.preventDefault();

  let bodyObj = {
    saying: saying.value,
    imageURL: imageURL.value,
  };

  createBooster(bodyObj);

  //reset form values to be blank
  saying.value = "";
  imageURL.value = "";
};

// Code for creating a confidence booster card
const createBoosterCard = (booster) => {
  const boosterCard = document.createElement("article");
  boosterCard.classList.add("booster-card");

  boosterCard.innerHTML = `<img src=${booster.imageURL} alt='confidence booster image'
  class="confidence-booster-image"/>
    <p class="confidence-booster-saying">${booster.saying}</p>
    <div class="like-container">
    <p class="confidence-booster-like"> <strong>${booster.count}</strong> <br/>likes for this confidence booster</p>
    <button class="like-btn" onclick="updateBooster(${booster.id}, 'liked')">Like</button>
    </div>
    <button class="booster-card-delete" onclick="deleteBooster(${booster.id})">delete</button>
    `;

  boosterContainer.appendChild(boosterCard);
};

//function for displaying confidence booster cards
const displayBoosters = (arr) => {
  boosterContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    createBoosterCard(arr[i]);
  }
};

form.addEventListener("submit", submitHandler);

getAllBoosters();
