import { db } from "../models/index.js";

const Account = db.accountsModel;

const checkAccount = (data, res) => {
  if (!data) return res.status(500).json({ error: "Conta Inexistente" });
};

const checkWithDrawBalance = (balance, withdrawValue) => {
  if (withdrawValue > balance) return false;

  return true;
};

const deposit = async (req, res) => {
  const { agencia, conta, valor } = req.params;
  console.log(req.params);

  const data = await Account.findOneAndUpdate(
    { agencia, conta },
    { $inc: { balance: valor } },
    {
      new: true,
    }
  );
  checkAccount(data, res);

  return res.json(data.balance);
};

const withdraw = async (req, res) => {
  const { agencia, conta, valor } = req.params;

  const data = await Account.findOne({ agencia, conta });
  checkAccount(data, res);

  if (checkWithDrawBalance(data.balance, valor)) {
    const data = await Account.findOneAndUpdate(
      { agencia, conta },
      { $inc: { balance: -1 * (Number(valor) + 1) } },
      {
        new: true,
      }
    );
    return res.json(data.balance);
  } else {
    return res.status(500).json({ error: "Saldo insuficiente para o saque" });
  }
};

const balance = async (req, res) => {
  const { agencia, conta } = req.params;
  const data = await Account.findOne({ agencia, conta });
  checkAccount(data, res);

  return res.json(data.balance);
};

const deleteAccount = async (req, res) => {
  const { agencia, conta } = req.params;
  const data = await Account.findOneAndRemove({ agencia, conta });
  checkAccount(data, res);

  const activeAccount = await Account.find({ agencia });

  return res.json({ activeAccounts: activeAccount.length });
};

const transferValue = async (req, res) => {
  const checkSameAgencies = (agencyOne, agencyTwo) => {
    const rateTransfer = 8;
    if (agencyOne !== agencyTwo) {
      return rateTransfer;
    }
    return 0;
  };

  const { contaOrigin, contaDest, valor } = req.params;

  const dataContaOrigin = await Account.findOne({ conta: contaOrigin });
  const dataContaDest = await Account.findOne({ conta: contaDest });

  const valueFinal =
    Number(valor) +
    checkSameAgencies(dataContaOrigin.agencia, dataContaDest.agencia);

  if (checkWithDrawBalance(dataContaOrigin.balance, valueFinal)) {
    const dataOrigin = await Account.findOneAndUpdate(
      { conta: contaOrigin },
      {
        $inc: {
          balance: -1 * valueFinal,
        },
      },
      {
        new: true,
      }
    );
    await Account.findOneAndUpdate(
      { conta: contaDest },
      {
        $inc: {
          balance: valor,
        },
      }
    );
    return res.json({ balance: dataOrigin.balance });
  } else {
    return res
      .status(500)
      .json({ error: "Saldo insuficiente para o deposito" });
  }
};

const averageBalance = async (req, res) => {
  const { agencia } = req.params;
  const data = await Account.find({ agencia });

  if (data.length !== 0) {
    const dataFiltered = data
      .map((account) => {
        return account.balance;
      })
      .reduce((acumulator, valueAtual) => {
        return acumulator + valueAtual;
      });

    const avg = (dataFiltered / data.length).toFixed(2);

    return res.json({ avg });
  } else {
    return res.status(500).json({
      error: "Agencia não encontrada",
    });
  }
};

const smallBalancies = async (req, res) => {
  const { quantidade } = req.params;

  const data = await Account.find({}, { _id: 0, name: 0 })
    .sort({ balance: 1 })
    .limit(+quantidade);

  res.json(data);
};

const bigBalancies = async (req, res) => {
  const { quantidade } = req.params;

  const data = await Account.find({}, { _id: 0 })
    .sort({ balance: -1 })
    .sort()
    .limit(+quantidade);

  let dataSorted = data.map((account) => {
    return account.name;
  });

  dataSorted = dataSorted.sort();

  res.json({ balance: data, name: dataSorted });
};

const transfer99 = async (req, res) => {
  const allAgencies = await Account.distinct("agencia");

  for (const agency of allAgencies) {
    const findTopAccount = await Account.find({ agencia: agency })
      .sort({ balance: -1 })
      .limit(1);

    const { name, conta, balance } = findTopAccount[0];

    await Account.create({
      agencia: 99,
      name,
      conta,
      balance,
    });
  }
  const findPrivateAgency = await Account.find({ agencia: 99 });
  return res.status(200).json(findPrivateAgency);
};

export default {
  deposit,
  withdraw,
  balance,
  deleteAccount,
  transferValue,
  averageBalance,
  smallBalancies,
  bigBalancies,
  transfer99,
};
