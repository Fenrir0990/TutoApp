<template>
    <div class="ceter firstContainer card "> 
        <h3><slot>Titulo de formulario</slot></h3>
            <FormKit  
                classes="error" 
                type="form" 
                v-model="formData" 
                submit-label="Enviar" 
                @submit="save(formData)"
            >
                <FormKit
                    class=""
                    type="text"
                    label="Titulo"
                    name="title"
                    placeholder="Titulo"
                    validation="required|length:3"
                    :validation-messages="{
                        required: 'Se requiere un titulo',
                        length:'Mas de 3 caracteres'
                    }"
                />
                <FormKit
                    type="text"
                    label="Descripcion"
                    name="description"
                    placeholder="Descripcion"
                    validation="required|length:10"
                    :validation-messages="{
                        required: 'Se require una descripcion',
                        length:'Minimo de 10 caracteres'
                    }"
                />
                <FormKit
                    type="text"
                    label="Url"
                    name="url"
                    placeholder="Url"
                    validation="url"
                />
                <FormKit
                    type="checkbox"
                    label="Estado"
                    name="state"
                    v-model="state"
                    validation-visibility="dirty"
                />
        </FormKit>
    <!-- <pre wrap>{{ formData }}</pre> -->

            
      
    </div>
</template>

<script>
import { ref } from 'vue'
const submitted = ref(false)
export default {
    name:"form-form",
    data:()=>({
        formData : submitted
    }),
    props:{
        data:{
            type:Object,
            default:()=>{}
        },

        text:{
            type:Object,
            default:()=>{}
        },
        active:{
            type:Function,
            default:(data)=>{
                console.log(data)
            }
        }
    },
    methods: {
        save(){
            console.log(submitted)
        }
    },
    mounted(){
        const recharge=(data)=>{
            for(let key in data){
                if(submitted.value[key] === data[key]){
                    submitted.value[key] = data[key];
                }
            }
        }
        recharge(this.data)
    },
}
</script>

<style scoped>
li{
    color: red;
}
ul{
    color: red;
}
.firstContainer{
    height : auto;
    width: auto;
    padding : 50px;
    margin : 10px 
} 
</style>