<template>
    <div class = 'container col firstContainer'>
        <div >
            <div class="col">
                <h1>Tutoriales</h1>
                <div class = 'primary m12'>
                    <input  type = 'text' class="" v-model="buscar">
                    <button class = "btn button" @click="search()" >Buscar</button>
                </div>
            </div>
            <div v-show="alltutorials.length === 0?true:false"> <!-- No hoy tutoriales || Not have tutorials -->
                <div class="container center m12">
                    <h3>No hay tutoriales</h3>
                    <p class="link"><router-link to= '/form'>Agregar Tutorial</router-link></p>
                </div>
            </div>
            <div v-show=" tutorials.length === 0 && alltutorials.length >0 ? true : false "><!-- No se encuentran tutoriales || Not tutorials found -->
                <div class="container center m12">
                    <h3> No se encontraron tutoriales con el titulo: {{buscado}}</h3>
                    <p class="link" @click="resetSearch()" > Ver todos los tutoriales </p>
                </div>
            </div>
            <div class=" row m12 " v-show = " tutorials.length === 0 || alltutorials.length===0 ?false:true" >
                <div class= "col m6" v-bind:class="{m12:!showDetail && !showEditor}" v-show="!showEditor">
                <table class="" v-show="tutorials.length === 0?false:true" >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Publicado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="tutori in tutorials" 
                            v-bind:key= tutori.id 
                            v-bind:class="{ teal: tutori.id === tutorial.id}"
                            @click="select(tutori)"
                            >
                            <td>{{tutori.title}}</td>
                            <td><label><input type="checkbox" v-model="tutori.state" disabled/><span></span></label></td>
                        </tr>
                    </tbody>
                </table>    
                </div>
                <div class= "col m6" v-show="showDetail">
                    <h5>Tutorial</h5>
                    <hr>
                    <h6>Titulo: {{tutorial.title}}</h6>
                    <p>Descripcion: {{tutorial.description}}</p>
                    <p>Estado: {{ tutorial.state? "Publicado": "No Publicado" }}</p>
                    <a v-bind:href="tutorial.url" class="btn button">Ir al tutorial</a>
                    <button @click="startEdit()" class="btn button">Editar tutorial</button>
                </div>
                <div class= "col m12" v-show="showEditor">
                    <h5>Editar tutorial</h5>
                    <hr>
                    <form @submit.prevent="edit">
                    <div class= "firstContainer col m12">

                    <div class="col m3 margin">
                        <label>Title</label>
                        <input type="text" v-model="tutorial.title"/>
                        <p class="error" v-show="first && error.title">Necesita Un titulo</p>
                    </div>
                    <div class="col m3 margin">
                        <label>Description</label>
                        <input type="text"  v-model="tutorial.description"/>
                    <p class="error" v-show="first && error.description">Necesita una descripcion</p> 

                    </div>
                    <div class="col  m3 margin">
                        <label>Url</label>
                        <input type="text"  v-model="tutorial.url" />
                        <p class="error" v-show="first && error.url.voice" > Necesita un url </p>
                        <p class="error" v-show="first && error.url.notValid" > Url invalido </p> 
                    </div>
                    <div class="col ">
                        <label>Estado</label>
                        <br>
                        <label><input type="checkbox" v-model= "tutorial.status"/><span>{{tutorial.status? "Publicado": "No publicado"}}</span></label>
                    </div>
                    </div>
                    <br>
                    <div class="row m3">
                        <span>
                            <button class="btn button" type="submit">┣Editar✎┤</button>
                            <button class = "btn button" @click = "startEdit()">┣No editar┤</button>
                            <button class = "btn button red" type="button" @click = "deleted()">┣Eliminar┤</button>
                        </span>
                    </div>
                    </form>
                </div>
            </div>
    </div>
        </div>
</template>

<script>
    import {urlApi} from "../../vars"
    import axios from "axios"
    export default {
        name:'Home-a',
            data(){
                return{
                    tutorials:[],
                    alltutorials:[],
                    tutorial:{},
                    buscar:"",
                    buscado:"",
                    showDetail:false,
                    showEditor:false,
                    bigList:true,
                    first:true,
                    haveturotials:true,
                    error:{
                        title:false,
                        description:false,
                        url:{
                            voice:false,
                            notValid:false
                        },
                    },
                }
            },
            methods :{
                search(){
                   /*  console.log(this.tutorials)
                    this.tutorials = this.alltutorials.filter(tuto=>{console.log(tuto)})
                    console.log(this.tutorials)*/
                    const a = `${this.buscar}` 
                    const array = [...this.alltutorials]
                    const data = array.filter(tuto => tuto.title.includes(a))
                    this.tutorials = data 
                    this.buscado = this.buscar
                    this.buscar = ""
                    console.log(this.tutorials)
                    console.log(this.alltutorials)
                },
                resetSearch(){
                    const data = [...this.alltutorials]
                    this.tutorials = data
                },
                async allTutorials(){
                    const {data} = await axios.get(`${urlApi}/tutorials`)
                    this.tutorials = data
                    this.alltutorials = data
                },
                async deleted (){
                    const {id} = this.tutorial;
                    const {data} = await axios.delete(`${urlApi}/tutorials/${id}`)
                    if(data.msg === "Tutorial deleted"){
                        this.allTutorials()
                        this.showEditor = false
                    }else{
                        alert(data.msg)
                    }
                    console.log(data)
                },
                startEdit(){
                    this.showEditor = !this.showEditor
                    this.showDetail = !this.showDetail
                },
                select (tutorial){
                if(tutorial.id === this.tutorial.id){
                    console.log("mismo id")
                    this.tutorial = {}
                    this.showDetail=false
                    this.showEditor= false
                    return
                }
                /* var a = JSON.parse(JSON.stringify(tutorial)) */
                this.tutorial = {...tutorial}
                this.showDetail = true
               },
                async edit(){
                    console.log(this.tutorial.id)
                    const {title, description, url,state} = this.tutorial
                    const {data} = await axios.put(`${urlApi}/tutorials/${this.tutorial.id}`,{
                        title,
                        description,
                        url,
                        state
                   })
                   console.log(data)
               },
            },
            updated() {
                
            },
            mounted(){
                console.log("Mounted on")
                const allTutorials = async ()=>{
                    const {data} = await axios.get(`${urlApi}/tutorials`)
                    this.tutorials = data
                    this.alltutorials = data
                    console.log(data)
                }
                allTutorials()
            }
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
    .sky{
        background-color: #00ffea;
    }
    .link{
        color: blue;
        cursor:pointer;
    }
   
</style>