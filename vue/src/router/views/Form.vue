<template>
    <div class = 'container col'>
        <div class = "contained" v-show = "createSuces">
            <div class = "card-panel center ajust">
                <h3>Tutorial Creado con exito</h3>
                <span>
                    <button 
                        class = "btn button" 
                        @click="news()"
                    > Agregar otro tutorial 
                    </button>
                    <router-link to=  '/'>
                        <button class="btn button noLink">Ver todos los tutoriales</button>
                    </router-link>
                </span>
            </div>
        </div>
        <div v-show = "!createSuces">
            <h4>Agregar Tutorial</h4>
            <hr>
            <form @submit.prevent="agregarTutorial">
                <div class="col margin">
                    <label>Title</label>
                    <input type="text" v-model="newTutorial.title"/>
                    <p class="error" v-show=" error.title">Necesita Un titulo</p>
                </div>
                <div class="col margin">
                    <label>Description</label>
                    <input type="text"  v-model="newTutorial.description"/>
                   <p class="error" v-show=" error.description">Necesita una descripcion</p> 

                </div>
                <div class="col margin">
                    <label>Url</label>
                    <input type="text"  v-model="newTutorial.url" />
                    <p class="error" v-show=" error.url.voice" > Necesita un url </p>
                    <br>
                    <p class="error" v-show=" error.url.notValid" > Url invalido </p>
                </div>
                <div class="col margin">
                    <label>Estado     </label>
                    <label><input type="checkbox" v-model= "newTutorial.status"/><span>{{newTutorial.status? "Publicado": "No publicado"}}</span></label>
                </div>
                
                <button class="btn" type="submit">Agregar</button>
            </form>
        </div>
        <!-- <button class="btn" @click="test()">TEST</button> -->
    </div>
</template>
<script>
    import axios from "axios";
    import { urlApi } from "../../utils";
    import{ validateForm } from "../../utils/functions"

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
           /*  async test(){
                const {data} = await axios.get(`${urlApi}/token`) 
                const a = await axios.post(`${urlApi}/tutorials`,{},{headers:{authorization:data.msg}})
                console.log(a.data) 
            }, */
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
                var {title,description,url,status} = {...this.newTutorial};
                var not = validateForm(this.newTutorial).not
                this.error = validateForm(this.newTutorial).error
                var payload = {
                    title,
                    description,
                    url,
                    status
                };
                if(not){
                    const {data} = await axios.post(`${urlApi}/tutorials`,payload)
                    
                    if(data.msg === 'Tutorial created successfully')
                    {
                        this.createSuces = !this.createSuces
                        return
                    }
                    if(data.msg === "Access denied, token incorrect or expired")
                    {
                        alert("El formulario a expirado");
                        location.reload()
                        this.$router.go(0)
                        return
                    }
                }
                
                alert("Tutorial invalido")
                


            }
        },
         mounted() {
                axios.get(`${urlApi}/token`).then(response=>{
                    const token = response.data.msg
                    axios.defaults.headers.common['authorization'] = token
                })
        }, 
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

