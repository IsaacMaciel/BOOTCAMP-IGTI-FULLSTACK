export default (mongoose) => {
  const schema = mongoose.Schema({
    agencia: {
      type: Number,
      required: true,
    },
    conta: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: [0, "O valor não pode ser menor que 0"],
    },
  });

  const Accounts = mongoose.model("accounts", schema, "accounts");

  return Accounts;
};
