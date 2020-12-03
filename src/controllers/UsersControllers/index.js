const connection=require('../../database/connection');
const crypto=require('crypto');


module.exports={
    async index (request,response) {
         const users = await connection('users')
         .select(['users.*']);
        return response.json(users);
    },


    /**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Integer} id Unique ID of users
 *
 * @apiSuccess {String} name Name of the User.
 * @apiSuccess {String} phone  Phone of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} image  Image of the User.
 * @apiSuccess {String} status  Status of the User.
 * @apiSuccess {String} type  Type of User.
 * @apiSuccess {String} token  Token autorizathion of the User.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "José Felipe",
 *       "phone": "84 99999999",
 *       "email": "jose@gmail.com",
 *       "image": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", 
 *       "status": "0", 
 *       "type": "1", 
 *       "token": "ew093m0gk302m4",  
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
    async get (request,response) {
        const {id}=request.params;
        const user=await connection('users')
        .where({'id': id})
        .select(['users.*']);

       return response.json(user);
   },


    async create(request,response){
        const {name, phone, email, password }=request.body;
            const [id]= await connection('users').insert({
                name,
                phone,
                email,               
                password,
                image: '',
                token: '',
                status: 0,
                type: 0,
            });
            return response.send(""+id);
    },

    /**
 * @api {put} /user/ Modify User information
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {Number} id          Users unique ID.
 * @apiParam {String} [firstname] Firstname of the User.
 * @apiParam {String} [lastname]  Lastname of the User.
 * @apiParam {String} [name] Name of the User.
 * @apiParam {String} [phone]  Phone of the User.
 * @apiParam {String} [email]  Email of the User.
 * @apiParam {String} [image]  Image of the User.
 * @apiParam {String} [status]  Status of the User.
 * @apiParam {String} [type]  Type of User.
 * @apiParam {String} [token]  Token autorizathion of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
    async update(request,response){
        const {name, email}=request.body;
        console.log(id);

            await connection('users').where({'id': id})
            .update({
                name: name,
                email: email
            })
            .then(function(numberOfUpdatedRows) {
                if(numberOfUpdatedRows) {                   
                    return response.send("Ok ");
                }
            }).catch(function(err){
                console.log(err);
                return response.send("Erro");
                return;         
            });           
    },
};