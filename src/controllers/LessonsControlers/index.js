const connection=require('../../database/connection');
const crypto=require('crypto');

//videom
var fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


// open input stream
var infs = new ffmpeg

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

    async uploadImage(request,response){
        const {id} = request.params;
        console.log(id)
        converterVideo();
        //converterVideo;     
        /*
        const user=await connection('users')
        .where({'id': id})
        .select(['users.*'])
        .then((result) =>{
            console.log(result.length);
            if(result.length > 0){
                console.log('ok');
                const { originalname: name, size, key, url = "", path } = request.file;
                console.log(request.file);
                connection('users').where({'id': id})
                .update({
                    image: 'http://192.168.1.9:3333/files/'+key,
                })
                .then(function(numberOfUpdatedRows) {
                    if(numberOfUpdatedRows) {                   
                        return response.send("Ok ");
                    }
                }).catch(function(err){
                    console.log(err);
                    return response.send("Erro");         
                });
            }else{
                response.status(404).send({
                    "error": "UserNotFound"
                  })
            }
           
        })
        .catch((err) => {response.status(500).send({
                   "error": "UserNotFound"
        }); console.log(err)});*/               
    },
};

const converterVideo = function(){
    infs.addInput('../../../videoplayback.mp4').outputOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 20',
    ]).output('./output/video.m3u8')
        .on('start', function (commandLine) {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('error', function (err, stdout, stderr) {
            console.log('An error occurred: ' + err.message, err, stderr);
        })
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done')
        })
        .on('end', function (err, stdout, stderr) {
            console.log('Finished processing!' , err, stdout, stderr)
        })
        .run()
      }