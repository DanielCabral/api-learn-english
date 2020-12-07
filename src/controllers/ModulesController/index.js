const connection=require('../../database/connection');
const crypto=require('crypto');


module.exports={
    async index (request,response) {
         const modules=await connection('modules')
         .select(['modules.*']);

        return response.json(modules);
    },
    async get (request,response) {
        const {id}=request.params;
        const modules=await connection('modules')
        .where({'id': id})
        .select(['modules.*']);

       return response.json(modules);
   },
    async create(request,response){
        const {title, description, level, image, id_user} = request.body;
            const [id]= await connection('modules').insert({
                title, 
                description, 
                level, 
                image, 
                user_id: id_user               
            });
            return response.send(
                {
                    id: id,
                }
            );
    },
    async update(request,response){
        const {title, description, level, image, id_user} = request.body;
        const {id}=request.params;
        
            await connection('modules').where({'id': id})
            .update({
                title, 
                description, 
                level, 
                image, 
                user_id: id_user  
            })
            .then(function(numberOfUpdatedRows) {
                if(numberOfUpdatedRows) {                   
                    return response.sendStatus(200);
                }
            }).catch(function(err){
                console.log(err);
                return response.sendStatus(400);
                return;         
            });             
    },
    async delete(request,response){
        const {id}=request.params;

            await connection('modules').where({'id': id})
            .del()
            .then(function(numberOfUpdatedRows) {
                if(numberOfUpdatedRows) {                   
                    return response.sendStatus(200);
                }
            }).catch(function(err){
                console.log(err);
                return response.sendStatus(400);     
            });             
    },
};