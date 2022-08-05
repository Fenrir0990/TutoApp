<template>
   <div class="flexCol">
        <div class ="container row center">
            <h1>Tutoriales Eliminados</h1>
            <div class = 'm12 row'>
                <input  type = 'text' class="" v-model="buscar">
                <button class = "btn button " @click="search()" >Buscar</button>
            </div>
        </div>    
        <div v-show = "view1"> 
            <Msg  ruta="/form" >
                <template #title="{text}" >{{text.text1}} Eliminados</template>
            </Msg> 
        </div>
        <div v-show = "view3">
            <Msg ruta="/form" :func = "resetSearch">
                <template #title="{text}">{{text.text1}} con el titulo: {{buscado}}</template>
                <template #textF="{text}">{{text.text4}}</template>
            </Msg>
        </div>
        <div  class=" flexRow" v-if="view2">
            <div class= "margin whidtHome" >
                <Tutorial :tutorial="tutorial" :tutorials="tutorials" :select="select"></Tutorial>
            </div>
            <div class="margin detailh whidtHome card-panel" v-if="showDetail">
                <Detail :url="tutorial.url" :buttfuntion="restore">
                        <template #titulo="">Tutorial a Restaurar</template>
                        <template #name="">{{tutorial.title}}</template>
                        <template #description>{{tutorial.description}}</template>
                        <template #state> {{tutorial.state ? "publicado" : "No publicado"}}</template>
                        <template #button2>Restaurar</template>
                </Detail>
            </div>
        </div>
   </div>
</template>

<script>
    import {urlApi} from "../../utils/index"
    import axios from "axios"
    /**Components**/
    import Tutorial from '../../components/Tutorial.vue'
    import Detail from "../../components/Detail.vue"
    import Msg from "../../components/Msg.vue"

    export default {
        name:"restore-a",
        components:{ Tutorial, Detail, Msg },
        data:()=>({
            tutorial:{},
            tutorials:[],
            alltutorials:[],
            buscar:"",
            buscado:"",
            showDetail:false

        }),
        computed:{
            view1(){
                return this.alltutorials.length === 0 ? true : false
            },
            view2(){
                return this.alltutorials.length === 0 || this.tutorials.length === 0? false : true
            },
            view3(){
                return this.tutorials.length === 0 && this.alltutorials.length > 0 ? true : false
            }   
        },
        methods: {
            resetSearch(){
                    const data = [...this.alltutorials]
                    this.tutorials = data
                },
            async restore(){
                console.log(this.tutorial.id)
                const {data} = await axios.put(urlApi + `/tutorials/restored/${this.tutorial.id}`)
                const newList = [...this.alltutorials].filter(tuto => {
                            if(tuto.id === this.tutorial.id) {
                                return false
                            }
                            return true
                        })
                        this.alltutorials = newList
                        this.tutorials = newList
                        
                        this.showDetail = false
                return data
            },
            select(tutorial){
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
            search(){
                const a = `${this.buscar}` 
                const array = [...this.alltutorials]
                const data = array.filter(tuto => tuto.title.toLowerCase().includes(a.toLowerCase()))
                this.tutorials = data 
                this.buscado = this.buscar
                this.buscar = ""
            }
        },
        mounted() {
           const load = async ()=>{
                    const {data} = await axios.get(`${urlApi}/tutorials/deleted`)
                    this.tutorials = data
                    this.alltutorials = data
                    console.log(this.tutorials)
                } 
            load()
        },
    }
</script>
<style scoped>

</style>

