<template>
    <div class="flexCol">
        <div class=" container row center" >
            <h1 class=" mTitle">Tutoriales</h1>
            <div class = 'm12'>
                <input  type = 'text' class="" v-model="buscar">
                <button class = "btn button " @click="search()" >Buscar</button>
            </div>
        </div>
        <div v-if="view1"> 
            <Msg ruta="/form">
                <template #title="{text}">{{text.text1}}</template>
                <template #textR="{text}">{{text.text3}}</template>
            </Msg> 
        </div>
        <div v-if = "view3">
            <Msg ruta="/form" :func="resetSearch">
                <template #title="{text}">{{text.text2}} con el titulo: {{buscado}}</template>
                <template #textF="{text}">{{text.text4}}</template>
            </Msg> 
        </div>
        <center v-show="view2" class="">
            <button class="btn red black-text card waves-effect waves-light" @click="destroy()">Eliminar todos los tutoriales</button>
        </center>
        <div class="  flexRow " v-if = "view2" >
            <div class= " margin whidtHome mAjust2" v-if="!showEditor">
                <Tutorial :tutorial="tutorial" :alltutorials="alltutorials" :tutorials="tutorials" :select="select"></Tutorial>
            </div> 
            <div class= " margin whidtHome card-panel detailh" v-if="showDetail">
                <Detail :url="tutorial.url" :buttfuntion="startEdit">
                    <template #titulo><h4>Edital Tutorial</h4></template>
                    <template #name>{{tutorial.title}}</template>
                    <template #description>{{tutorial.description}}</template>
                    <template #state> {{tutorial.state ? "publicado" : "No publicado"}}</template>
                    <template #button2> Editar </template>
                </Detail>
                
            </div>
        </div> 
            <center class= "ajust majust" v-if="showEditor">
                    <Aform :activ="edit" :info="tutorial">
                        <template #title>Editar Tutorial</template>
                    <template #b1>
                        <button class = "btn button space" type="button" @click="closeEditor">Volver</button>
                        <button class = "btn button red space"  type="button" @click = "deleTuto(this.tutorial.id)">Eliminar</button> 
                    </template>
                    <template #b2>

                    </template>
                    </Aform>
            </center>
    </div>
</template>

<script>
/**Depende**/
    import axios from "axios"
    /**Variabls**/
    import {urlApi} from "../../utils"
    /**Components**/
    import Aform from "../../components/Aform.vue"
    import Tutorial from '../../components/Tutorial.vue'
    import Detail from "../../components/Detail.vue"
    import Msg from "../../components/Msg.vue"
    /**Functions**/ 
    import { deleteAll, getAllTutorials } from '../../utils/functions'

    export default {
        name:'Home-a',
        components: { Tutorial , Detail, Msg, Aform }, 
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
                            return this.tutorials.length === 0 && this.alltutorials.length > 0 ? true : false
                        }   
                    },
            methods :{
                
                async destroy(){
                    deleteAll()
                    const {data} = await axios.get(`${urlApi}/tutorials`)
                    this.tutorials = []
                    this.alltutorials = []
                    this.showEditor= false
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
                async edit(payload){
                    let {title, description, url,state} = payload
                    state = state === undefined ? false : true
                    const pack = {
                        title,
                        description,
                        url,
                        state
                        }
                    const {data} = await axios.put(`${urlApi}/tutorials/${this.tutorial.id}`,pack)
                    const newList = [...this.alltutorials].map(tuto=>{
                        if(this.tutorial.id === tuto.id){
                            var a = {
                                title,
                                description,
                                url,
                                state,
                                id:this.tutorial.id
                                }
                            this.tutorial = a
                            return a
                        }
                        return tuto
                    })
                    this.alltutorials = newList
                    this.tutorials = newList
                    this.closeEditor()
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
.ajust{
    height: 300px;
    width: auto;
}
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