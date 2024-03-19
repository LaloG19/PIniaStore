<script setup>
import { ref,onMounted, watch, computed } from 'vue';
import { useUsers } from '../stores/example.ts';
import router from '@/router';

const store = useUsers();

const listado = ref([]);
const usuarioNuevo = ref({
  name: '',
  email: '',
  group: ''
});

const registroCompleto = computed(() => {
  if(usuarioNuevo.value.name.length > 4 && usuarioNuevo.value.email.length > 13 && 
  usuarioNuevo.value.group.length > 4 && usuarioNuevo.value.name != '' && 
  usuarioNuevo.value.email != '' && usuarioNuevo.value.group != '' &&
  usuarioNuevo.value.email.match(/@/g) && usuarioNuevo.value.email.match(/.com/g) ){
    return true;
  }else{
    return false;
  }
});

function agregarUsuario(){
  store.agregarEstudiante(usuarioNuevo.value).then((res) => {
    if(res == true){
      alert('Usuario agregado');
      router.push({name: 'home'});
    }
  });
}
</script>

<template>
  <div class="viewRegistro">
    <h1> Registrar nuevo estudiante </h1>

    <div class="formulario">
      <div class="frm">
        <input type="text" placeholder="Nombre" minlength="5" v-model="usuarioNuevo.name">
        <input type="email" placeholder="Correo" minlength="15" v-model="usuarioNuevo.email">
        <input type="text" placeholder="Grupo" minlength="5" v-model="usuarioNuevo.group">
        <button @click="agregarUsuario" v-if="registroCompleto"> Agregar Registro </button>
        <button @click="router.push({name: 'home'});" > Regresar </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.viewRegistro{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 30rem;
  max-height: 100%;
  background-color: rgb(6, 41, 11);
}
h1{
  background-color: rgb(255, 255, 255);
  color: #000;
  font-weight: bolder;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin: 2rem auto;
}
.formulario{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 19rem;
  margin-bottom: 1rem;
}
button{
  font-weight: bold;
  background-color: rgb(0, 163, 22);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  margin-bottom: 1rem;
  width: 100%;
}
.frm{
  display: flex;
  flex-direction: column;
  flex-direction: flex-start;
  align-items: flex-start;
  justify-content: center;
  margin: 1rem;
}
input, button{
  margin-bottom: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  height: 2rem;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
