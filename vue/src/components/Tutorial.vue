<template>
    <div class="container center">
            
        <table class="table-fill">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Publicado</th>
                </tr>
            </thead>
            <tbody class="table-hover">
                <tr 
                    v-for ="tutori in tutorials" 
                    v-bind:key= "tutori.id" 
                    v-bind:class="{ focus: tutori.id === tutorial.id}"
                    @click="select(tutori)"
                    >
                    <td>{{tutori.title}}</td>
                    <td><label><input type="checkbox" v-model="tutori.state" disabled/><span></span></label></td>
                </tr>
            </tbody>
        </table>   
    </div> 
</template>
<script>
    export default {
        name:"tutorial-a",
        data:()=>({}),
        props:{ 
            tutorials:{ 
                type:Array,
                
            },
            select:Function,
            tutorial:Object,
        },
    }
</script>
<style>
/*** Table Styles **/
.table-title h3 {
   color: #fafafa;
   font-size: 30px;
   font-weight: 400;
   font-style:normal;
   font-family: "Roboto", helvetica, arial, sans-serif;
   text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
   text-transform:uppercase;
}
.table-fill {
  border-radius:3px;
  border-collapse: collapse;
  height: 320px;
  margin: auto;
  max-width: 600px;
  padding:5px;
  width: 100%;
  box-shadow: 0 5px 10px rgba(2, 85, 98, 0.294);
  animation: float 5s infinite;
}
th {
  color:#D5DDE5;;
  background:#009688 ;
  border-bottom:4px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size:23px;
  font-weight: 100;
  padding:24px;
  text-align:left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align:middle;
}
th:first-child {
  border-top-left-radius:3px;
}
th:last-child {
  border-top-right-radius:3px;
  border-right:none;
}
tr {
  border-top: 1px solid #C1C3D1;
  border-bottom: 1px solid #C1C3D1;
  color:#666B85;
  font-size:16px;
  font-weight:normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}
tr:hover td {
  background:#0089805b ;
  color:#FFFFFF;
  border-top: 0px solid #22262e;
}
tr:first-child {
  border-top:none;
}
tr:last-child {
  border-bottom:none;
}
/* tr:nth-child(odd):hover td {
    background:#4E5066;
} */ 
tr:last-child td:first-child {
    border-bottom-left-radius:3px;
}
tr:last-child td:last-child {
    border-bottom-right-radius:3px;
}
td {
  padding:20px;
  text-align:left;
  vertical-align:middle;
  font-weight:500;
  font-size:18px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #C1C3D1;
}
td:last-child {
    border-right: 0px;
}
th.text-left {
    text-align: left;
}
th.text-center {
    text-align: center;
}
th.text-right {
    text-align: right;
}
td.text-left {
    text-align: left;
}
td.text-center {
    text-align: center;
}
td.text-right {
    text-align: right;
}
</style>