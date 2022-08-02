const {Tutorial} = require('../db');
const getAll = async (req,res)=>{  
    try{
        const tutorials = await Tutorial.findAll()
        res.json(tutorials)
    }
    catch(err){
        res.json({msg:"Error in --/tutorials-- Get",error:err})
        throw err
    }
}
const getForID = async (req,res)=>{ 
    try{
        const {id} = req.params
        console.log(id)
        const tutorial = await Tutorial.findByPk(id) 
        res.json(tutorial).status(200)
    }catch(err){
        res.json({msg:"Error in ---/tutorials/:id---",error:err}).status(400)
        throw err
    }
    
}
const post = async (req,res)=>{ 
    const { title, description, url, state } = req.body
    try{
        
        if(!title||!description||!url) {
            
            return res.json({msg:"missing data"}).state(400)
            
        }
        title = title.charAt(0).toUpperCase() + title.slice(1);
        const tutorial = await Tutorial.create({
            title,
            description,
            url,
            state
        })
        res.status(201).send({ msg: "Tutorial created successfully" })
    }catch(err){
        res.json({msg:"Failed to create tutorial", error:err}).status(400)
        console.log(err)
        throw err
    }
};
const deleteAll = async (req,res)=>{   
    try{
        const a = await Tutorial.destroy({
            truncate: true
        })
        const b = await Tutorial.findAll()
        console.log(b)
        res.json({msg:`Have ${b.length} tutoriales`}).status(200)
    }catch(err){
        res.json({msg:"Error in ---/tutorials/mass_delete--- Delete",error:err}).status(400)
    }
}
const deleteFotId = async (req,res)=>{    
    try{
        const { id } = req.params
        const b = await Tutorial.findByPk(id)
        if(!b){
            res.json({msg:`Not exist tutorial whit id:${id}`})
            return
        }
        const a = await Tutorial.destroy({
            where: {id}
        })

        res.json({msg:`Tutorial deleted`,id:id}).status(200)
    }catch(err){
        res.json({msg:"Error in ---/tutorials/:id--- Delete",error:err}).status(400)
    }
}
const put = async (req,res)=>{ 
    try{
        const { id } = req.params
        const {title,description,url,state} = req.body
        if(!title || !description ||!url){
            res.json({msg:`Missing data`})
            return
        }
        const b = await Tutorial.findByPk(id)
        if(!b.id){
            res.json({msg:`Not exist tutorial whit id:${id}`})
            return
        }
        const a = await Tutorial.update({
                title,
                description,
                url,
                state
            },
            {where: { id } 
        });
        if(a)res.json({msg:`Tutorial update`,id:id}).status(200)
    }catch(err){
        res.json({msg:"Error in ---/tutorials/:id--- Put",error:err}).status(400)
    }
}
module.exports = {
    getAll,
    getForID,
    post,
    deleteAll,
    deleteFotId,
    put
};

 



























