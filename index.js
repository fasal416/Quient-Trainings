require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const Message = require('./models/messages');
const adminRoutes = require('./routes/adminRoutes');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('index', { path: '/' });
});

app.get('/about', (req, res) => {
    res.render('about', { path: '/about' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { path: '/contact' });
});

app.get('/testimonials', (req, res) => {
    res.render('testimonials', { path: '/testimonials' });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', { path: '/gallery' });
});

app.post('/contact', (req, res) => {
    newmsg = new Message(req.body);
    newmsg.save((err) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.end();
        } else {
            res.status(200);
            res.end();
        }
    });
});

app.use((req, res) => {
    res.send("<h1>404 - Page Not Found</h1>")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server started at port 3000");
})