const connection=require('../../database/connection');
const crypto=require('crypto');


module.exports={
    async index (request,response) {
         const modules=await connection('lessons')
         .select(['lessons.*']);

        return response.json(modules);
    },
    async get (request,response) {
        const {id}=request.params;
        const lessons=await connection('lessons')
        .where({'id': id})
        .select(['lessons.*']);

       return response.json(lessons);
   },
    async create(request,response){
        const {title, description,link, id_module, thumbnail, id_user} = request.body;
            const [id]= await connection('lessons').insert({
                title, 
                description, 
                link, 
                id_module,
                thumbnail, 
                id_user,              
            });
            return response.send(
                {
                    id: id,
                }
            );
    },
    async update(request,response){
        const {title, description, link, id_module, thumbnail, id_user} = request.body;
        const {id}=request.params;
        
            await connection('lessons').where({'id': id})
            .update({
                title, 
                description, 
                link, 
                id_module,
                thumbnail, 
                id_user,      
            })
            .then(function(numberOfUpdatedRows) {
                if(numberOfUpdatedRows) {                   
                    return response.sendStatus(204);
                }
            }).catch(function(err){
                console.log(err);
                return response.sendStatus(400);
                return;         
            });             
    },
    async delete(request,response){
        const {id}=request.params;
        console.log(id)
            await connection('lessons').where({'id': id})
            .del()
            .then(function(numberOfUpdatedRows) {
                console.log(numberOfUpdatedRows)
                if(numberOfUpdatedRows) {                   
                    return response.sendStatus(204);
                }else{
                    return response.sendStatus(404);
                }
            }).catch(function(err){
                console.log(err);
                return response.sendStatus(400);     
            });             
    },
};