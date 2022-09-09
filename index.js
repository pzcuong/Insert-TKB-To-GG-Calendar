const express = require('express');
const xuly = require('./sources/process/xuly');
var json2html = require('json2html')

const app = express();

app.get('/', async(req, res) => {
  let data = await xuly.XuLyTKB();
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(json2html.render(data));
  //res.status(200).json(data);
});

async function ThemTKB() {
  let result = await xuly.XuLyTKB();
  console.log(result);
}

app.listen(8080, () => {
  console.log('server started');
  setInterval(ThemTKB, 1000 * 60 * 60);
});
