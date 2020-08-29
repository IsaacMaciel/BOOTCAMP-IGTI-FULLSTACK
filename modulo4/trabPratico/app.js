import express  from "express";
import {db} from "./models/index.js"

import {route} from './routes/index.js'

const app = express();

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("Conectando ao mongoDB");
  } catch (error) {
    console.log("Error: " + error);
  }
})();

app.use(express.json());
app.use(route);

app.listen(3333, () => {
  console.log("Api rodando na porta: " + 3333);
});
