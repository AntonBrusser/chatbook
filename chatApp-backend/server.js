const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
const cookieParser = require ('cookie-parser');
const cors = require ('cors');
// const logger = require ('morgan');

app.use(cors());

const dbCnfig = require ('./config/secret');

app.use((req, res, next)  => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(cookieParser());
// app.use(logger());

mongoose.Promise = global.Promise;
mongoose.connect(dbCnfig.url, { useNewUrlParser: true, useUnifiedTopology: true });

const auth = require ('./routes/authRoutes');
const posts = require ('./routes/postRoutes');

app.use('/api/chatApp', auth);
app.use('/api/chatApp', posts);

app.listen(3000, () => {
    console.log('Running on port 3000')
});
