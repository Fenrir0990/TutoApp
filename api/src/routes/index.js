const { Router } = require('express');
const { getAll, getForID, getAllDeleted, post, deleteAll, deleteForId, put, putRestore } = require("../controllers/index") 
const {generateToken,validateToken} = require ("../controllers/token")
const router = Router();

/********************ROUTES********************/
/*GET*/
router.get("/",(req,res)=>{ // RUTA BASE || BASE PATH
    res.json({msg:"server on"}).status(200)
});
router.get("/token", generateToken)
router.get("/tutorials", getAll);  //PETICION DE TODOS LOS TUTORIALES || GET ALL TUTORIALS
router.get('/tutorials/deleted',getAllDeleted)
router.get("/tutorials/:id",getForID); //PETICION DE TUTORIAL POR ID || GET TUTORIAL FOR ID
/*POST*/
router.post("/tutorials",validateToken,post);  // CREAR NUEVO TUTORIAL || CREATE NEW TUTORIAL
/*DELETE*/
router.delete("/tutorials/mass_delete", deleteAll);  //ELIMINAR TODOS LOS TUTORIALES || DELETED ALL TUTORIALS
router.delete("/tutorials/:id", deleteForId);  // ELIMINAR TUTORIAL POR ID  ||  DELETED TUTORIAL FOR ID

/*PUT*/
router.put("/tutorials/:id", put);  //ACTUALIZAR TUTORIAL || UPDATE TUTORIAL
router.put("/tutorials/restored/:id", putRestore)
/********************ROUTES********************/
module.exports = router;
