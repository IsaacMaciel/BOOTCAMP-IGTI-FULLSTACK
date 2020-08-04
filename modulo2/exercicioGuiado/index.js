const express = require("express");
const accountRouter = require("./routes/account");
const { promises } = require("fs");

const port = 3000;

const fs = promises;

global.filename = "accounts.json";

const app = express();
app.use(express.json());

app.use("/account", accountRouter);

app.listen(port, async () => {
  const initialJson = {
    nextId: 1,
    accounts: [],
  };
  try {
    await fs.readFile(filename);
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    fs.writeFile(filename, JSON.stringify(initialJson))
      .then(() => {
        console.log("Api Started and File Created!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(`Api rodando na porta ${port}`);
});
