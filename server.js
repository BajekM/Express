const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidable = require('express-formidable');

const app = express();
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(formidable());

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', (req, res) => {

  // console.log(req.fields, req.files);

  const { author, sender, title, message} = req.fields;
  const { image } = req.files;

  // console.log(image.name);
  
  if(author && sender && title && message && image) {
    res.render('contact', { isSent: true, fileName: image.name });
  }
  else {
    res.render('contact', { isError: true });
  }

});
app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});