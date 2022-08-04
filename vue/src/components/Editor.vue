<template>
  <div class="container m12 ">
    <h5>Editar tutorial</h5>
    <hr>
    <form @submit.prevent="edit">
        <div class= "firstContainer  contained  card-panel row ">
            <div class="col container">
                <div class="  margin">
                    <label>Titulo</label>
                    <input type="text" placeholder="Titulo" v-model="editData.title"/>
                    <p class = "error" v-show=" error.title " >Necesita Un titulo</p>
                </div>
                <div class=" margin">
                    <label>Descripcion</label>
                    <input type="text" placeholder="Descripcion" v-model="editData.description"/>
                <p class="error" v-show=" error.description">Necesita una descripcion</p> 

                </div>
                <div class="  margin">
                    <label>Url</label>
                    <input type="text"  v-model="editData.url" />
                    <p class="error" v-show=" error.url.voice" > Necesita un url </p>
                    <p class="error" v-show=" error.url.notValid" > Url invalido </p> 
                </div>
                <div class=" m3 ">
                    <label>Estado</label>
                    <br>
                    <label class="black-text btn teal lighten-4 panel card" ><input type="checkbox" v-model= "editData.state"/><span>{{editData.state? "Publicado": "No publicado"}}</span></label>
                </div>
            </div>
            
        </div>
        <br>
        
        <div class=" secondContainer center ">
                <button class="btn button space"  type="submit" >Editar✎</button>
                <button class = "btn button space" type="button" @click="closeEditor">Volver</button>
                <button class = "btn button red space"  type="button" @click = "deleTuto(this.tutorial.id)">Eliminar</button> 
        </div>
    </form>
  </div>
</template>

<script>
import {urlApi} from "../utils"
import axios from "axios"
import { validateForm } from "../utils/functions.js"

export default {
    name:"edit-a",
    data:()=>({
        editData:{
            title:"",
            description:"",
            url:"",
            state:false
        },
        error:{url:{}},


    }),
    props:{
        closeEditor:Function ,
        tutorial:Object,
        deleTuto:Function
    },
    methods: {
        async edit(){
            var not = validateForm(this.editData).not
            this.error = validateForm(this.editData).error
            const {title, description, url,state} = this.editData
            if(not){
                const {data} = await axios.put(`${urlApi}/tutorials/${this.tutorial.id}`,{
                    title,
                    description,
                    url,
                    state
                })
                this.$router.go(0) 
                data.msg === "Tutorial update"? this.allTutorials() :null

            }
        },
        
    },
    mounted() {
        const load = ()=>{
            this.editData = {...this.tutorial}
        }
        load()
    },
}
</script>

<style>
.space{
    margin: 6px;
    min-width: 100px;
}
.error{
        color: red;
    }

</style>