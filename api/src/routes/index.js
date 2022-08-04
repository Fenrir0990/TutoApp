const { Router } = require('express');
const { getAll, getForID, getAllDeleted, post, deleteAll, deleteForId, put, putRestore } = require("../controllers/index") 
const {generateToken,validateToken} = require ("../controllers/token")
const router = Router();

/********************ROUTES********************/
/*GET*/
router.get("/",(req,res)=>{ // Ruta base || Base path
    res.json({msg:"server on"}).status(200)
});
router.get("/token", generateToken)
router.get("/tutorials", getAll);  // Peticion de todos los tutoriales || Get all tutorials
router.get('/tutorials/deleted',getAllDeleted) // Peticion de todos los tutoriales eliminados || Get all tutorials deleted
router.get("/tutorials/:id",getForID); // Peticion de tutorial por id || Get tutorial for id
/*POST*/
router.post("/tutorials",validateToken,post);  // Crear nuevo tutorial || Create new tutorial
/*DELETE*/
router.delete("/tutorials/mass_delete", deleteAll); // Eliminar todos los tutoriales || Deleted all tutorials
router.delete("/tutorials/:id", deleteForId);  // Eliminar tutorial por id  ||  Deleted tutorial for id 
/*PUT*/
router.put("/tutorials/:id", put);  // Actualizar tutorial || Update tutorial
router.put("/tutorials/restored/:id", putRestore) // Restaurar tutorial por id || Restored tutorial for id
/********************ROUTES********************/

module.exports = router;
