
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Tutorial} = require('./src/db');
/**************************************************/
//Carga inicial de tutoriales para trabajar
const tutos = async ()=>{
  const caminar = await Tutorial.create({
    title:"caminar",
    description:"Se pone un pie adelante del otro repetidamente",
    url:"https://EstoEsULIink.com",
    state:false
  });
  const respirar = await Tutorial.create({
    title:"respirar",
    description:"Chupar aire por la nariz de forma automatica",
    url:"https://EstoEsULIink.com",
    state:true
  });
  const nadar = await Tutorial.create({
    title:"nadar",
    description:"Avanzar en el agua sin morir en el intento",
    url:"https://EstoEsULIink.com",
    state:false
  });
};
conn.sync({ force:true }).then(() => {
  server.listen(3001, () => {
    tutos()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
