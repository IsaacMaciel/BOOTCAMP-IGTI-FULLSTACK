const { promises } = require("fs");
const { loggers } = require("winston");
const fs = promises;

const { validatorFields } = require("../validators/");

module.exports = {
  async store(req, res, next) {
    {
      try {
        let account = req.body;
        validatorFields(account);

        const { name, balance } = account;
        const data = JSON.parse(await fs.readFile(filename));
        account = { id: data.nextId++, name, balance };
        data.accounts.push(account);

        await fs.writeFile(filename, JSON.stringify(data, null, 2));
        logger.info(`POST /account - ${JSON.stringify(account)}`);
        res.send(account);
      } catch (err) {
        next(err);
      }
    }
  },

  async index(req, res, next) {
    try {
      const { accounts } = JSON.parse(await fs.readFile(filename));
      res.send(accounts);
      logger.info("GET /account");
    } catch (err) {
      next(err);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const { accounts } = JSON.parse(await fs.readFile(filename));

      const findAccount = accounts.find((account) => account.id === +id);
      res.send(findAccount);
      logger.info("GET /account/:id");
    } catch (err) {
      next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const data = JSON.parse(await fs.readFile(filename));

      data.accounts = data.accounts.filter((account) => account.id !== +id);
      await fs.writeFile(filename, JSON.stringify(data, null, 2));
      res.end();
      logger.info(`DELETE /account:id - ${id}`);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const account = req.body;
      validatorFields(account);

      const {name,balance} = account;

      const data = JSON.parse(await fs.readFile(filename));
      let findAccount = data.accounts.findIndex(
        (acc) => acc.id === +account.id
      );

      data.accounts[findAccount].name = name;
      data.accounts[findAccount].balance = balance;

      await fs.writeFile(filename, JSON.stringify(data,null,2));
      res.end();
      logger.info(`PUT /account:id - ${account}`);
    } catch (err) {
      next(err);
    }
  },
};
