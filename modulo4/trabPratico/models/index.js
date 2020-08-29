import mongoose from "mongoose";

import accountsModel  from "./accountsModel.js";

const db = {};
const urlDb = "mongodb://localhost:27017/trabPratico";

db.url = urlDb;
db.mongoose = mongoose;
db.accountsModel = accountsModel(mongoose);

export { db };
