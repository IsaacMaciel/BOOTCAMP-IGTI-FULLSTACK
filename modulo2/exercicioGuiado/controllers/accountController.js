const { promises } = require("fs");
const fs = promises;

module.exports = {
  async store(req, res) {
    {
      try {
        let account = req.body;
        const data = JSON.parse(await fs.readFile(filename));
        account = { id: data.nextId++, ...account };
        data.accounts.push(account);

        await fs.writeFile(filename, JSON.stringify(data, null, 2));

        res.send(account);
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    }
  },

  async index(req, res) {
    try {
      const { accounts } = JSON.parse(await fs.readFile(filename));

      res.send(accounts);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const { accounts } = JSON.parse(await fs.readFile(filename));

      const findAccount = accounts.find((account) => account.id === +id);
      res.send(findAccount);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const data = JSON.parse(await fs.readFile(filename));

      data.accounts = data.accounts.filter((account) => account.id !== +id);
      await fs.writeFile(filename, JSON.stringify(data, null, 2));

      res.end();
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const account = req.body;

      const data = JSON.parse(await fs.readFile(filename));
      let findAccount = data.accounts.findIndex((acc) => acc.id === +account.id);

      data.accounts[findAccount] = account;

      await fs.writeFile(filename, JSON.stringify(data));
      res.end();
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
};
