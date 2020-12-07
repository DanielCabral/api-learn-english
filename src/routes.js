var express = require('express');
const morgan = require("morgan")
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

const multer = require('multer');
const ProjectsController=require('./controllers/ProjectsController');
const UsersController=require('./controllers/UsersControllers');
const ModulesController=require('./controllers/ModulesController');
const LessonsController=require('./controllers/LessonsControlers')
const multerConfig = require('./config/multer')
const multerConfigVideo = require('./config/multerVideo')

var router = express.Router();
router.use(express.json());

router.use(morgan("tiny"))

router.use('/',express.static('apidoc'))
router.use('/files',express.static('tmp/uploads'))
router.use('/videos',express.static('output'))

//router.use(verifyJWT());;

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

//----------------------------------------------------
//Rotas de usuario 
router.get('/users', UsersController.index);

router.post('/user', UsersController.create);

router.put('/user', UsersController.update);

router.patch('/image/:id', multer(multerConfig).single('file'), UsersController.uploadImage);

router.get('/user/:id', UsersController.get);

//router.get('/login/', ProjectsController.auth);



//----------------------------------------------------
//Rotas de modulos 
router.get('/modules', ModulesController.index);

router.post('/modules', ModulesController.create);

router.put('/module/:id', ModulesController.update);

///router.patch('/imagemodule/:id', multer(multerConfig).single('file'), ModulesController.uploadImage);

router.get('/module/:id', ModulesController.get);


//----------------------------------------------------
//Rotas de lições 
router.get('/lessons', LessonsController.index);

router.post('/lessons', LessonsController.create);

router.put('/lesson/:id', LessonsController.update);

router.patch('/lesson/:id', multer(multerConfigVideo).single('file'), LessonsController.uploadImage);

router.get('/lesson/:id', LessonsController.get);

router.delete('/lesson/:id', LessonsController.delete);

module.exports = router;