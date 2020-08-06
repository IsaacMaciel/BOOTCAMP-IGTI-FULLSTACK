module.exports = {
  validatorFields(content) {
    const { name, balance } = content;

    if (!name || balance == null) {
      throw new Error("O campo Nome e Balance devem ser preenchidos");
    } else if (typeof name !== "string" || typeof balance !== "number") {
      throw new Error(
        "O campo nome deve ser uma string e o balance deve ser um número"
      );
    }
  },
};
