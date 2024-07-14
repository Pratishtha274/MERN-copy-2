const express =require("express");
const cors =require("cors");
const mongoose = require("mongoose");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const User=require('./models/User')
require('dotenv').config()
const cookieParser=require('cookie-parser');
const imageDownloader = require('image-downloader');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const app=express();
const multer=require('multer')
const fs=require('fs');
//const AWS = require('aws-sdk');
//const multer = require('multer');
const multerS3 = require('multer-s3');
const service=require('./models/service');
const Booking=require('./models/Booking');
const bcryptSalt=bcrypt.genSaltSync(10);
const bucket = 'pratishtha-booking-app';
const mime = require('mime-types');
const port = process.env.PORT || 4000;
const helmet = require("helmet");
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
const allowedOrigins = [
    'http://localhost:5173', // your local development
    'https://pratishtha.vercel.app' // your production site
  ];

const privateNetworkAccessMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Private-Network', 'true');
    next();
};

app.use(cors({
    credentials: true,
    origin: allowedOrigins,
    preflightContinue: true, // Ensure preflight requests are handled
    optionsSuccessStatus: 204
}));
app.use(privateNetworkAccessMiddleware);
app.use(helmet());

// Content Security Policy configuration
const cspDefaults = {
    directives: {
        defaultSrc: ["'self'"], // Allow content only from the same origin
        imgSrc: ["'self'", "https://pratishtha.vercel.app", "https://*.amazonaws.com"], // Add your image sources
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Adjust as needed
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "http://localhost:4000"], // Your API endpoint
        frameSrc: ["'self'"],
    },
};

app.use(
    helmet.contentSecurityPolicy(cspDefaults)
);

const s3 = new S3Client({
    region: 'ap-southeast-2',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

const photosMiddleware = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'pratishtha-booking-app',
        key: function (req, file, cb) {
            cb(null, `uploads/${Date.now()}_${file.originalname}`); // Unique filename
        },
    }),
});


async function uploadtoS3(path,originalFilename,mimetype){
    const client = new S3Client({
        region: 'ap-southeast-2',
        credentials:{
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;
    const data = await client.send(new PutObjectCommand({
       Bucket: bucket,
       Body: fs.readFileSync(path),
       Key: newFilename,
       ContentType: mimetype,
       ACL: 'public-read',
    }));
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`
}
function getUserDataFromReq(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.SECRET_KEY, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
        });
    });
    
}

app.get('/api/test',(req,res)=> {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok');

});
app.post('/api/register', async (req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password}= req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json({userDoc});

    }
    catch(e){
        res.status(422).json(e);
    }
    
    
});
app.post('/api/login', async (req,res)=> {
    mongoose.connect(process.env.MONGO_URL);
    const{email,password}=req.body;
    const userDoc=await User.findOne({email});
    if(userDoc){
        const passOk=bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({email:userDoc.email,
                id:userDoc._id},process.env.SECRET_KEY,{},(err,token)=>{
              if(err) throw err;
              res.cookie('token',token,{
              }).json(userDoc);
            });
            
        }else{
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found');
    }
});

  
  // Profile route
  
  // Profile route
app.get('/api/profile', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token}  = req.cookies;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
          if (err) throw err;
          const {name,email,_id}=await User.findById(userData.id);
          res.json({name,email,_id});
        });
      } else {
        res.json(null);
      }
});
  
app.post('/api/logout',(req,res) =>{
    res.cookie('token','').json(true);
});


app.post('/api/upload-by-link', async (req,res) =>{
    const {link}=req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: '/tmp/' +newName,
    });
    const url = await uploadtoS3('/tmp/' +newName,newName,mime.lookup('/tmp/' +newName))
    res.json(url);
});

//const photosMiddleware = multer({dest:'uploads'});
app.post('/api/upload',photosMiddleware.array('photos',100),async (req,res) =>{
    const uploadedFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname,mimetype} = req.files[i];
        const url=await uploadtoS3(path,originalname,mimetype);
        uploadedFiles.push(url);
    }
   res.json(uploadedFiles);
});

app.post('/api/services',(req,res)=>{
        mongoose.connect(process.env.MONGO_URL);
        const {token}=req.cookies; 
        const{title,address,addedPhotos,description,arrivalTime,departureTime,price,mobile}=req.body; 
        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
          if (err) throw err;
          const serviceDoc = await service.create({
            owner:userData.id,
            title,
            address,
            photos:addedPhotos,
            description,
            arrivalTime,
            departureTime,
            price,
            mobile,
          });
          res.json(serviceDoc);
        });
});

app.get('/api/user-services',(req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token}= req.cookies;
    jwt.verify(token,process.env.SECRET_KEY, {}, async (err, userData) => {
        const {id} =userData;
        res.json(await service.find({owner:id}))
    });
});

app.get('/api/services/:id',async (req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
    const {id}=req.params;
    res.json(await service.findById(id));
} );

app.put('/api/services', async(req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
    const {token}=req.cookies; 
    const{id,title,address,addedPhotos,description,arrivalTime,departureTime,price,mobile}=req.body; 
    jwt.verify(token,process.env.SECRET_KEY, {}, async (err, userData) => {
        const serviceDoc= await service.findById(id);
        if(userData.id === serviceDoc.owner.toString()){
           serviceDoc.set({
            title,
            address,
            photos:addedPhotos,
            description,
            arrivalTime,
            departureTime,
            price,
            mobile,
           })
           await serviceDoc.save();
           res.json('ok');
       }
    });
})

app.get('/api/services',async (req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
    res.json(await service.find())
})

app.post('/api/bookings',async (req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const{service,bookingDate,name,mobile,addr,price,} =req.body;
    Booking.create({
        service,bookingDate,name,mobile,addr,price,user:userData.id
    }).then((doc) =>{
        res.json(doc);
    }).catch((err) => {
         throw err;
    });
});



app.get('/api/bookings',async (req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
   const userData = await getUserDataFromReq(req);
   res.json(await Booking.find({user:userData.id}).populate('service'));
});

app.listen(port);
console.log("Server is running");