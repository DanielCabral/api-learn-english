var express = require('express');
const ProjectsController=require('./controllers/ProjectsController');
const UsersController=require('./controllers/UsersControllers');

var router = express.Router();
router.use(express.json());

router.get('/', (req,res) => {
    res.send('OK');
});


//----------------------------------------------------
//Rotas de usuario 
router.get('/users', ProjectsController.index);

router.post('/user',ProjectsController.create);

router.put('/user', ProjectsController.update);

router.get('/user/:id', ProjectsController.get);

//router.get('/login/', ProjectsController.auth);




module.exports = router;