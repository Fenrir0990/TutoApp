<template>
    <div class = 'container col firstContainer'>
        <div >
            <div class="col">
                <h1>Tutoriales</h1>
                <div class = 'primary m12 '>
                    <input  type = 'text' class="" v-model="buscar">
                    <button class = "btn button " @click="search()" >Buscar</button>
                </div>
            </div>
            <div class="center">
                <button v-show="view2" class="btn red black-text card waves-effect waves-light" @click="destroy()">Eliminar todos los tutoriales</button>
            </div>
            <div v-show="view1"> 
                <Msg ruta="/form">
                    <template #title="{text}">{{text.text1}}</template>
                    <template #textR="{text}">{{text.text3}}</template>
                </Msg> 
            </div>
            <div v-show = "tutorials.length===0 && alltutorials.length>0? true : false">
                <Msg ruta="/form" :func="resetSearch">
                    <template #title="{text}">{{text.text2}} con el titulo: {{buscado}}</template>
                    <template #textF="{text}">{{text.text4}}</template>
                </Msg> 
            </div>
            <div class=" row m12 " v-show = "view2" >
                <div class= "col m6" v-bind:class="{m12:!showDetail && !showEditor}" v-show="!showEditor">
                    <Tutorial :tutorial="tutorial" :alltutorials="alltutorials" :tutorials="tutorials" :select="select"></Tutorial>
                </div> 
                <div class= "col m6 " v-show="showDetail">
                    <Detail :url="tutorial.url" :buttfuntion="startEdit">
                        <template #titulo>Tutorial</template>
                        <template #name>{{tutorial.title}}</template>
                        <template #description>{{tutorial.description}}</template>
                        <template #state> {{tutorial.state ? "publicado" : "No publicado"}}</template>
                        <template #button2> Editar </template>
                    </Detail>
                    <!-- <h5>Tutorial</h5>
                    <hr>
                    <h6>Titulo: {{ tutorial.title }}</h6>
                    <p>Descripcion: {{ tutorial.description }}</p>
                    <p>Estado: {{ tutorial.state ? "Publicado" : "No Publicado" }}</p>
                    <a v-bind:href=" tutorial.url " class="btn button">Ir al tutorial</a>
                    <button @click = " startEdit() " class = "btn button" >Editar tutorial</button> -->
                </div>
                <div class= "col m12" v-if="showEditor">
                     <Editor :tutorial = "tutorial" :closeEditor="closeEditor" :deleTuto="deleTuto"></Editor> 
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
/**Depende**/
    import axios from "axios"
    /**Variabls**/
    import {urlApi} from "../../utils"
    /**Components**/
    import Tutorial from '../../components/Tutorial.vue'
    import Editor from "../../components/Editor.vue"
    import Detail from "../../components/Detail.vue"
    import Msg from "../../components/Msg.vue"
    /**Functions**/ 
    import { deleteAll, getAllTutorials } from '../../utils/functions'

    export default {
        name:'Home-a',
        components: { Tutorial, Editor, Detail, Msg }, 
            data(){
                return{
                    tutorials:[],
                    alltutorials:[],
                    tutorial:{},
                    buscar:"",
                    buscado:"",
                    showDetail:false,
                    showEditor:false,
                    /* bigList:true, */
                }
            },
                    computed:{
                        view1(){
                            return this.alltutorials.length === 0? true : false
                        },
                        view2(){
                            return this.alltutorials.length === 0 || this.tutorials.length === 0 ? false : true
                        },
                        view3(){
                            return this.tutorials.length === 0 && this.alltutorials.length ==! 0 ? true : false
                        }   
                    },
            methods :{
                async destroy(){
                    deleteAll()
                    const {data} = await axios.get(`${urlApi}/tutorials`)
                    this.tutorials = []
                    this.alltutorials = []
                    return data
                },
                async deleTuto(id){
                    const {data} = await axios.delete(`${urlApi}/tutorials/${id}`)
                    if(data.msg === "Tutorial deleted"){
                        const newList = [...this.alltutorials].filter(tuto => {
                            if(tuto.id === id) {
                                return false
                            }
                            return true
                        })
                        this.alltutorials = newList
                        this.tutorials = newList
                        this.showEditor = false
                        this.showDetail = false
                    }else{
                        alert(data.msg)
                    }
                },

                search(){
                    const a = `${this.buscar}` 
                    const array = [...this.alltutorials]
                    const data = array.filter(tuto => tuto.title.toLowerCase().includes(a.toLowerCase()))
                    this.tutorials = data 
                    this.buscado = this.buscar
                    this.buscar = ""
                },
                closeEditor(){
                    this.showDetail = true
                    this.showEditor = false
                },
                resetSearch(){
                    const data = [...this.alltutorials]
                    this.tutorials = data
                },
                async allTutorials(){
                    const data = getAllTutorials()
                    this.tutorials = data
                    this.alltutorials = data
                },
                startEdit(){
                    this.showEditor = !this.showEditor
                    this.showDetail = !this.showDetail
                },
                select(tutorial) {
                    if(tutorial.id === this.tutorial.id){
                        console.log("mismo id")
                        this.tutorial = {}
                        this.showDetail= false
                        this.showEditor= false
                        return
                    } 
                    this.tutorial = {...tutorial}
                    this.showDetail = true
               },
                async edit(){
                    const {title, description, url,state} = this.tutorial
                    const {data} = await axios.put(`${urlApi}/tutorials/${this.tutorial.id}`,{
                        title,
                        description,
                        url,
                        state
                   })
                   return data
               },
            },
            mounted(){
                const allTutorials = async ()=>{
                    const {data} = await axios.get(`${urlApi}/tutorials`)
                    this.tutorials = data
                    this.alltutorials = data
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