const express = require('express')
const gradeRouter = require('./routes/grade')

const port = 3000;

global.filename = 'grades.json'

const app = express();
app.use(express.json())
app.use(gradeRouter)

app.listen(port, () => {
    console.log(`Api rodando na porta ${port}`)
})