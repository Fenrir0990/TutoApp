<template>
<div>
  <nav>
    <div class="nav-wrapper  teal darken-1">
      <a href="#" class="brand-logo"><router-link to= '/'>TutoApp</router-link></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to= '/'>Tutoriales</router-link></li>
        <li><router-link to= '/form'>Agregar Tutorial</router-link></li>
      </ul>
    </div>
  </nav>
  
  <div>
    <router-view/>
  </div>
</div>

</template>
//---------------------------------------------------------------//
<script>
  export default {
    name: 'App'
  }
</script>
//---------------------------------------------------------------//

<style>

</style>
