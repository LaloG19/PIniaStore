<script setup>
import { ref,onMounted, watch } from 'vue';
import { useUsers } from '../stores/example.ts';
import { useRoute } from 'vue-router';
import router from '@/router';


const store = useUsers();
const route = useRoute();
const idUsuario = ref(null);
const usuario = ref(null);

onMounted(()=>{
  idUsuario.value = route.params.id;
  if (idUsuario.value != 0){
    store.buscarEstudiante(idUsuario.value).then((res) => {
       if(res == true){
          usuario.value = store.GetStudent;
       }else{
        alert('No existe el usuario con ID: ' + idUsuario.value);  
        router.push({name: 'home'});
       }
    });
  }else{
    router.push({name: 'home'});
  }
}) 
 
 
</script>

<template>
  <div class="viewUser">
    <h1 v-if="usuario == null"> Estudiante con matrícula</h1>
    <div class="contenido" v-else>
      <h1> Estudiante con matrícula {{ usuario.id }} </h1>
      <div class="datos">
        <span> Nombre del estudiante: <b> {{ usuario.name }} </b> </span>
        <span> Correo del estudiante: <b> {{ usuario.email }} </b> </span>
        <span> Grupo del estudiante: <b> {{ usuario.group }} </b> </span>
      </div>
    </div>
    <button @click="router.push({name: 'home'})" class="btRegresar"> Regresar </button>
  </div>
</template>

<style scoped>
.viewUser{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-height: 100%;
  background-color: rgb(6, 41, 11);
}
.contenido{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  border-radius: 1rem;
  margin: 1.5rem;
  color: #000;
  font-weight: bold;
}
h1{
  background-color: rgb(255, 255, 255);
  color: #000;
  font-weight: bolder;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-transform: uppercase;
  margin: 0rem;
}
button{
  font-weight: bold;
  background-color: rgb(0, 163, 22);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-right: 0rem;
  outline: none;
}
.datos{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(12, 97, 23);
  padding: 1rem;
  border-radius: 1rem;
  margin: 1.5rem;
  color: #fff;
  font-weight: bold;
}
b{
  font-weight: bold;

}
.btRegresar{
  height: 2rem;
  margin-bottom: 2rem;
}
</style>
