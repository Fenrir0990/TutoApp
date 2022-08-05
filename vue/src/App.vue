<template>
  <div>
    <header>
      <Nav></Nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
    </footer>
  </div>
</template>
//---------------------------------------------------------------//
<script>
import Nav from "./components/Nav.vue"
  export default {
    name: 'App',
    components:{ Nav }
  }
</script>
//---------------------------------------------------------------//

<style>

</style>
