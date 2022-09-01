const express = require('express');
const xuly = require('./sources/process/xuly');

const app = express();

app.get('/', async(req, res) => {
  let data = await xuly.XuLyTKB();
  res.status(200).json(data);
});

async function ThemTKB() {
  let result = await xuly.XuLyTKB();
  console.log(result);
}

app.listen(8080, () => {
  console.log('server started');
  setInterval(ThemTKB, 1000 * 60 * 60);
});
