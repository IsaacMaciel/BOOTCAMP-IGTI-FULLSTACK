const express = require("express");
const accountRouter = require("./routes/account");
const { promises } = require("fs");

const fs = promises;

const app = express();
app.use(express.json());

app.use("/account", accountRouter);

app.listen(3000, async () => {
  const initialJson = {
    nextId: 1,
    accounts: [],
  };
  try {
    await fs.readFile("accounts.json");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    fs.writeFile("accounts.json", JSON.stringify(initialJson))
      .then(() => {
        console.log("Api Started and File Created!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("Api Started");
});
