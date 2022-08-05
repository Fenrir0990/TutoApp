<template>
<div>
    <div>
        <nav>
            <div class=" nav-wrapper  teal darken-1">
                <a href="#" class="brand-logo"><router-link to= '/'>TutoApp</router-link></a>
                
                <button class=" burger " @click="click">
                    <i v-show="!open" class="material-icons ">format_align_justify</i>
                    <i v-show="open" class="material-icons ">clear</i>
                </button>
                
                <ul id="nav-mobile" class="right hide-on-med-and-down ">
                    <li><router-link to= '/'>Tutoriales</router-link></li>
                    <li><router-link to= '/form'>Agregar Tutorial</router-link></li>
                    <li><router-link to= '/restore'>Restaurar Tutorial</router-link></li>
                </ul> 
            </div>
        </nav>
    </div>
    <Menu v-bind:class="{open:open}"></Menu>
</div>
</template>

<script>
import Menu from "./menu.vue"
    export default {
        name:"nav-a",
        components:{Menu},
        data:()=>({
            open:false,
            
        }),
        methods: {
            click(){
                this.open = !this.open
                }
        }

    }
</script>

<style>

</style>