
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Tutorial} = require('./src/db');
/**************************************************/
//Carga inicial de tutoriales para trabajar
const tutos = async ()=>{
  /* const caminar = await Tutorial.create({
    title:"Caminar",
    description:"Como caminar correctamente ",
    url:"https://www.youtube.com/watch?v=Ibq0vPk7JxA&ab_channel=Fisiocare",
    state:false
  });
  const respirar = await Tutorial.create({
    title:"Nadar",
    description:"Como aprender a nadar",
    url:"https://www.youtube.com/watch?v=hu_CdkWZdFk&ab_channel=Nataci%C3%B3n%28SkillsNT%29",
    state:true
  });
  const nadar = await Tutorial.create({
    title:"Como hacer una mesa",
    description:"En este tutorial aprenderas a hacer una mesa.",
    url:"https://www.youtube.com/watch?v=C2fQfdqqons&ab_channel=BarquitodeVapor",
    state:false
  }); */
};
conn.sync({ force:true }).then(() => {
  server.listen(3001, () => {
    tutos()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
