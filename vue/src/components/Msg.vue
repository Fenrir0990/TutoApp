<template>
    <div class = "center m12 card-panel teal-text">
        <h3><slot :text = "text" name = "title"></slot></h3>
        <p class="link">
            <router-link :to= 'ruta'>
                <slot :text = "text" name = "textR"></slot>
            </router-link>
        </p>
        <p class="link" @click="func">
            <slot :text="text" name="textF"></slot>
        </p>
    </div>
</template>

<script>
export default {
    name:"msg-a",
    data:()=>({
        text:{
            text1:"No Hay Tutoriales",
            text2:"No se encontraron tutoriales",
            text3:"Agregar Tutorial",
            text4:"Ver Todos Los Tutoriales"
        }
    }),
    props:{
        ruta:String,
        func:{
            type:Function,
            default:()=>{return}
        }
    }
}
</script>

<style>
.link{
        color: blue;
        cursor:pointer;
    }
</style>