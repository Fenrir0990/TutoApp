<template>
    <div class="container">
        <div><h1>Pagina de testeo de componenets</h1></div>
        <hr>
        <div>
            <Form></Form>
        </div>
    </div>
</template>

<script>
import Form from "../../components/Cform.vue"
export default {
    name:"test-a",
    components:{
        Form
    }
}
</script>

<style>

</style>