<template>
  <div class="contained">
    <h5><slot name="title">Informacion</slot></h5>
    <hr>
    <p> ▶ Nombre : <slot name="name"></slot></p>
    <p> ▶ Descripcion : <slot name="description"></slot></p>
    <p> ▶ Estado : <slot name="state"></slot> <!-- {{ tutorial.state ? "Publicado" : "No Publicado" }} --></p>
    <a v-bind:href = "url" class ="btn space" >Ir al tutorial</a>
    <button @click ="buttfuntion" class = "btn space" ><slot name="button2"></slot></button>
  </div>
</template>

<script>
export default {
  name:"detail-a",
  props:{
    url:{
      type:String,
      validate(value){
        return typeof value === "string"
      }
    },
    buttfuntion:{
      type:Function
    },

  }
}
</script>

<style>
.space{
  margin: 6px;
}
</style>