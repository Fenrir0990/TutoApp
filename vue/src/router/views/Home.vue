<template>
    <div class = 'container col '>
        <div v-show=" !haveturotials ">
            <div class="container card-panel">
                <h2>No hay tutoriales</h2>
            </div>
        </div>
        <div v-show=" haveturotials ">
        <div class="col">
            <h1>Tutoriales</h1>
            <div class = 'primary '>
                <input  type = 'text'>
                <button class = "btn" >Buscar</button>
            </div>

        </div>
        <div class="row m12">
            <div class= "col m6" >
            <table class="striped" v-show="true">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Publicado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="tutorial in tutorials" v-bind:key= tutorial.id>
                        <td>{{tutorial.title}}</td>
                        <td><label><input type="checkbox" v-model="tutorial.status" disabled/><span></span></label></td>
                    </tr>
                </tbody>
            </table>    
            </div>
            <div class= "col m6" v-show="true">
                <h5>Tutorial</h5>
                <hr>
                <h6>Titulo: {{tutorial.title}}</h6>
                <p>Descripcion: {{tutorial.description}}</p>
                <p>Estado: {{ tutorial.status? "Publicado": "No Publicado" }}</p>
                <button class="btn button">Ir al tutorial</button>
                <button class="btn button">Editar tutorial</button>
            </div>

        </div>

    </div>
        </div>
</template>

<script>
    export default {
            name:'Home-a',
            data(){
                return{
                    tutorial:{
                            id:1,
                            title:"Esto es un titlulo",
                            url:"https:estoEsUnaURL.com",
                            description:"Esto es una descripcion",
                            status:true
                    },
                    haveturotials:true,
                    tutorials:[
                        {
                            id:2,
                            title:" caminar",
                            url:"https:estoEsUnaURL.com",
                            description:"Esto es una descripcion",
                            status:true
                        },
                        {
                            id:7,
                            title:" Nadar",
                            url:"https:estoEsUnaURL.com",
                            description:"Esto es una descripcion",
                            status:"No punlicado"
                        },
                        {
                            id:4,
                            title:" patear",
                            url:"https:estoEsUnaURL.com",
                            description:"Esto es una descripcion",
                            status:false
                        },{
                            id:5,
                            title:" Nadar",
                            url:"https:estoEsUnaURL.com",
                            description:"Esto es una descripcion",
                            status:true
                        }

                    ]
                }
            },
            methods(){
            },
        }
</script>
<style scoped>
 .primary{
    display: flex;
    flex-direction: row;
 }
 .button{
        margin: 5px;
    }
</style>