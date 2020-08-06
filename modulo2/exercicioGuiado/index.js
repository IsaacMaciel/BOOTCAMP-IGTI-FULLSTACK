const express = require("express");
const accountRouter = require("./routes/account");
const winston = require("winston");
const { promises } = require("fs");

const port = 3000;

const fs = promises;

global.filename = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: combine(
    label({ label: "my-bank-api"}),
    timestamp(),
    myFormat
  )
});

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
        logger.info("Api Started and File Created!");
      })
      .catch((err) => {
        logger.error(err);
      });
  }
  logger.info(`Api rodando na porta ${port}`);
});
