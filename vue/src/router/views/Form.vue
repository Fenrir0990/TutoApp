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
           <Aform
           :activ="agregarTutorial"
           >
           </Aform>
        </div>
    </div>
</template>
<script>
    /**Dependencies**/
    import axios from "axios";
    /**Utils**/
    import { urlApi } from "../../utils";
    /**Componentes**/
    import Aform from "../../components/Aform.vue"

    export default {
        name:'Form-a',
        components:{Aform},
        data(){
            return {
                createSuces:false,
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
                    state:false
                }
                this.createSuces = !this.createSuces
            },
           async agregarTutorial(payload){
                const {data} = await axios.post(`${urlApi}/tutorials`,payload)
                    if(data.msg === 'Tutorial created successfully')
                    {
                        this.createSuces = !this.createSuces
                        return
                    }
                    if(data.msg === "Access denied, token incorrect or expired")
                    {
                        alert("El formulario a expirado");
                        this.$router.go(0)
                        return
                    }
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

.button{
    margin: 5px;
}
.error{
    color: red;
}

</style>

