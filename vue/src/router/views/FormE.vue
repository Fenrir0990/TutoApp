<template>
    <div class = 'container col '>
        <div class="contained " v-show="createSuces">
            <div class="card-panel center ajust">
                <h3>Tutorial Editado con exito</h3>
                <span>
                    <button class="btn button ">Agregar Un tutorial</button>
                    <button class="btn button" >Ver Todos Los Tutoriales</button>
                </span>
            </div>
        </div>
        <div v-show="!createSuces">
            <h4>    Editar Tutorial</h4>
            <hr>
            <form @submit.prevent="agregarTutorial">
                <div class="col margin">
                    <label>Title</label>
                    <input type="text" v-model="newTutorial.title"/>
                    <p class="error" v-show="first && error.title">Necesita Un titulo</p>
                </div>
                <div class="col margin">
                    <label>Description</label>
                    <input type="text"  v-model="newTutorial.description"/>
                   <p class="error" v-show="first && error.description">Necesita una descripcion</p> 

                </div>
                <div class="col margin">
                    <label>Url</label>
                    <input type="text"  v-model="newTutorial.url" />
                    <p class="error" v-show="first && error.url.voice" > Necesita un url </p>
                    <p class="error" v-show="first && error.url.notValid" > Url invalido </p> 
                </div>
                <div class="col margin">
                    <label>Estado</label>
                    <br>
                    <label><input type="checkbox" v-model= "newTutorial.status"/><span>{{newTutorial.status? "Publicado": "No publicado"}}</span></label>
                </div>
                
                <button class="btn" type="submit">Agregar</button>
            </form>
        </div>
        
    </div>
</template>
<script>
import axios from "axios";
import { urlApi } from "../../vars/index"
    
    export default {
        name:'Form-a',
         
        data(){
            return {
                newTutorial:{
                    title:'',
                    description: '',
                    url:'',
                    status:false
                },
                error:{
                    title:false,
                    description:false,
                    url:{
                        voice:false,
                        notValid:false
                    },
                },
                createSuces:false,
                first:false,
                
            }
        },
        methods: {
           async agregarTutorial(){
                var {title,description,url,status} = this.newTutorial;
               /*  var error = true */
                const isValidUrl = (string) => {
                    try {
                        new URL(string);
                        return true;
                    } catch (_) {
                        return false;  
                    }
                    }
                this.first = true
                if(!title)this.error.title = true
                if(title)this.error.title = false
                if(!description) this.error.description = true
                if(description) this.error.description = false
                if(!url)this.error.url.voice = true
                if(url)this.error.url.voice = false
                if(!isValidUrl(url))this.error.notValid = true
                if(isValidUrl(url))this.error.notValid = false
                var payload = {
                    title,
                    description,
                    url,
                    status
                };
                const a = await axios.post(`${urlApi}/tutorials`,payload)
                console.log(a.datadata)
                 /* await this.axios.post("",payload).then(a=>a) */ 


            },
            
        }
    }
</script>
<style scoped>
    .margin {
        padding: 10px;
    }
    .button{
        margin: 5px;
    }
    .ajust{
        padding-bottom:50px;
    }
    .error{
        color: red;
    }
</style>
