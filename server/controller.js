let boosters = require("./db.json");

let globalId = 4;

module.exports = {
  getCompliments: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    //choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      "Remember the birthday but never the age",
      "Share your joys and sorrows with your family",
      "The best prediction of future is the past",
      "The only people who never fail are those who never try",
      "You can see alot just by looking",
    ];

    // choose random fortune
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
  },

  getBoosters: (req, res) => {
    res.status(200).send(boosters);
  },

  deleteBooster: (req, res) => {
    let index = boosters.findIndex((elem) => elem.id === +req.params.id);
    boosters.splice(index, 1);
    res.status(200).send(boosters);
  },

  createBooster: (req, res) => {
    let { saying, imageURL } = req.body;

    if (!imageURL) {
      imageURL = "../images/benjamin-davies-FiZTaNTj2Ak-unsplash.jpeg";
    }

    if (!saying) {
      saying = "Keep up the great work!";
    }

    let newBooster = {
      id: globalId,
      saying: saying,
      imageURL: imageURL,
      count: 0,
    };

    boosters.push(newBooster);
    res.status(200).send(boosters);
    globalId++;
  },

  updateBooster: (req, res) => {
    let { id } = req.params;
    let { type } = req.body;
    let index = boosters.findIndex((elem) => +elem.id === +id);

    if (type === "liked") {
      boosters[index].count++;
      res.status(200).send(boosters);
    }
  },
};
