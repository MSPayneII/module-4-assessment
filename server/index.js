const express = require("express");
const cors = require("cors");
const ctrl = require("./controller");

const app = express();

app.use(express.json()); // When we want to be able to accept JSON.
app.use(cors());

app.get("/api/compliment", ctrl.getCompliments);
app.get("/api/fortune", ctrl.getFortune);

app.get(`/api/booster`, ctrl.getBoosters);
app.delete(`/api/booster/:id`, ctrl.deleteBooster);
app.post(`/api/booster`, ctrl.createBooster);
app.put(`/api/booster/:id`, ctrl.updateBooster);

app.listen(4000, () => console.log("Server running on 4000"));
