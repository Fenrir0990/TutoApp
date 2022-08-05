<template>
  <div class=" container m12 ">
        <div class="container panel">
            <form @submit.prevent="formActive" class="flexCol card-panel">  
                <div>
                    <slot name="title"></slot>
                </div>
                <div class="col margin">
                    <label>Titulo</label>
                    <input type="text" v-model="formData.title"/>
                    <p class="error" v-show=" error.title">Necesita Un titulo</p>
                </div>
                <div class="col margin">
                    <label>Descripcion</label>
                    <input type="text"  v-model="formData.description"/>
                   <p class="error" v-show="error.description.required" >Necesita una descripcion</p>
                   <p class="error" v-show="error.description.min" >Minimo 10 caracteres</p>
                </div>
                <div class="col margin">
                    <label>Url</label>
                    <input type="text"  v-model="formData.url" />
                    <p class="error" v-show=" error.url.voice" > Necesita un url </p>
                    <br>
                    <p class="error" v-show=" error.url.notValid" > Url invalido </p>
                </div>
                <div class="col margin">
                    <label>Estado     </label>
                    <label><input type="checkbox" v-model= "formData.state"/><span>{{formData.state? "Publicado": "No publicado"}}</span></label>
                </div>
                
                <button class="btn" :disabled="submit" type="submit">Agregar</button>
            </form>
            <center class="">
                <slot name="b1"></slot>
                <slot name="b2"></slot>
                <slot name="b3"></slot>
                <slot name="b4"></slot>
            </center>
        </div>
    </div>
</template>

<script>
    import {validateForm} from "../utils/functions"

export default {
    name:"form-aa",
    data:()=>({
        formData:{
            title:"",
            description:"",
            url:"",
            state:false,
            id:""
        },
        submit:true,
        error:{ 
            description:{},
            url:{}
        }
    }),
    props:{
        info:{
            type:Object,
            default:()=>{}
        },
        activ:{
            type:Function,
            default:(data)=>{
                console.log(data)
            }
        }
    },
    methods: {
        formActive() {
            var {title,description,url,state,id} = this.formData
            const pack = {
                title,
                description,
                state,
                url
            }
            this.activ(pack,id)
            this.formData = {
                title : "",
                description : "",
                url:"",
                state : false,
                id : ""
            }
            this.error = { 
                description:{},
                url:{}
            }
        },
    },
    watch:{
        formData:{
            handler(data){
                var res = validateForm(data)
                this.error = res.error
                this.submit = !res.not
                console.log(res)
            },
            deep:true
        }
    },

    mounted() {
        const recharge=(data)=>{
            for(let key in data){
                if(Object.prototype.hasOwnProperty.call(this.formData, key)){
                    this.formData[key] = data[key];
                }
            }
        }
        recharge({...this.info})
    },
}
</script>

<style >
.error{
    color: red;
}
</style>