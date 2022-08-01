<template>
    <div class = 'container col '>
        <div class="contained " v-show="createSuces">
            <div class="card-panel center ajust">
                <h3>Tutorial Creado con exito</h3>
                <span>
                    <button class="btn button" @click="news()"> Agregar otro tutorial </button>
                    <button class="btn button">Ver Todos Los Tutoriales</button>
                </span>
            </div>
        </div>
        <div v-show="!createSuces">
            <h4>Agregar Tutorial</h4>
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
                    <br>
                    <p class="error" v-show="first && error.url.notValid" > Url invalido </p>
                </div>
                <div class="col margin">
                    <label>Estado     </label>
                    <label><input type="checkbox" v-model= "newTutorial.status"/><span>{{newTutorial.status? "Publicado": "No publicado"}}</span></label>
                </div>
                
                <button class="btn" type="submit">Agregar</button>
            </form>
        </div>
        
    </div>
</template>
<script>
    import axios from "axios";
    import { urlApi } from "../../vars/index";
    
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
            news (){
                this.newTutorial= {
                    title:'',
                    description: '',
                    url:'',
                    status:false
                }
                this.createSuces = !this.createSuces
            },
           async agregarTutorial(){
                var {title,description,url,status} = this.newTutorial;
                let not = true
                const isValidUrl = (string) => {
                    try {
                        new URL(string);
                        return true;
                    } catch (_) {
                        return false;  
                    }
                    }
                this.first = true
                if(!title) {
                    this.error.title = true
                    not = false
                    }
                if(title)this.error.title = false
                if(!description) {
                    this.error.description = true
                    not = false
                    }
                if(description) this.error.description = false
                if(!url){
                    this.error.url.voice = true
                    not = false
                    }
                if(url)this.error.url.voice = false
                if(!isValidUrl(url)){
                    this.error.url.notValid = true
                    not = false
                    console.log(url,"no es valido", this.error.notValid)
                    }
                else if (isValidUrl(url)){
                    console.log("12-is",isValidUrl(url))
                    console.log("es valido")
                    this.error.url.notValid = false
                    }
                var payload = {
                    title,
                    description,
                    url,
                    status
                };
                if(not){
                    const {data} = await axios.post(`${urlApi}/tutorials`,payload)
                    console.log(data)
                    if(data.msg === 'Tutorial created successfully'){
                        this.createSuces = !this.createSuces
                    }
                return}
                console.log(this.error.url.notValid)
                alert("Tutorial invalido")
                /* await this.axios.post("",payload).then(a=>a) */


            }
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

