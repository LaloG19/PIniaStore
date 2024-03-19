<script setup>
import { ref,onMounted, watch, computed } from 'vue';
import { useUsers } from '../stores/example.ts';
import router from '@/router';

const store = useUsers();

const listado = ref([]);
const usuarioID = ref(0);

const modo = ref(0);

const usuarioNuevo = ref();
const registroCompleto = computed(() => {
  if(usuarioNuevo.value.name.length > 4 && usuarioNuevo.value.email.length > 4 && usuarioNuevo.value.group.length > 4 && usuarioNuevo.value.name != '' && usuarioNuevo.value.email != '' && usuarioNuevo.value.group != ''){
    return true;
  }else{
    return false;
  }
});

onMounted(()=>{
  cargarEstudiantes();
})

function cargarEstudiantes(){
  store.cargarEstudiantes().then(() => {
    listado.value = store.GetStudents;
  });
}

function borrarUsuario(id){
  usuarioID.value = id;
  console.log('[BORRAR] usuarioID: ' + usuarioID.value);
  store.borrarEstudiante(usuarioID.value).then((res) => {
    if(res == true){
      store.cargarEstudiantes().then(() => {
        alert('Usuario eliminado: ' + id);
        listado.value = store.GetStudents;
      });
    }
    usuarioID.value = 0;
  });
}

function buscarUsuario(id){
  if(id != undefined){
    usuarioID.value = id;
  }

  if(usuarioID.value != 0){
    /* Si el id esta dentro de los id que hay en lisado */
    if(listado.value.some(estudiante => estudiante.id == usuarioID.value)){
      router.push({name: 'usuario', params: {id: usuarioID.value}});
    }else{
      alert('No existe el usuario con ID: ' + usuarioID.value);
      usuarioID.value = 0;
    }
  }
}

function agregarUsuario(){
  console.log('[AGREGAR] datos: ' + JSON.stringify(usuarioNuevo.value));
  store.agregarEstudiante(usuarioNuevo.value).then((res) => {
    if(res == true){
      store.cargarEstudiantes().then(() => {
        alert('Usuario agregado');
        listado.value = store.GetStudents;
      });
    }
  });
}

watch(modo, (newVal, oldVal) => {
  if(newVal != oldVal){
    usuarioNuevo.value = {
      name: '',
      email: '',
      group: ''
    }
  }
})
</script>

<template>
  <div class="viewHome">
    <h1> Listado Usuarios </h1>

    <div class="formulario">
      <span> Buscar por ID: </span>
      <input type="number" v-model="usuarioID" min=1>
      <button @click="buscarUsuario(usuarioID)" v-if="usuarioID != 0"> Buscar </button>
      <!-- <button @click="modo = !modo"> {{ modo == 0 ? 'Agregar Estudiante' : 'Cancelar'}} </button> -->
      <button @click="router.push({name: 'registro'});"> Agregar Estudiante </button>
    </div>
    
    <div class="formulario" v-if="modo==1">
      <h2> Registrar nuevo estudiante</h2>
      <div class="frm">
        <input type="text" placeholder="Nombre" minlength="5" v-model="usuarioNuevo.name">
        <input type="email" placeholder="Correo" minlength="5" v-model="usuarioNuevo.email">
        <input type="text" placeholder="Grupo" minlength="5" v-model="usuarioNuevo.group">
      </div>

      <button @click="agregarUsuario" v-if="registroCompleto"> Agregar Registro </button>
    </div>

    <div class="tablaContainer">
      <table>
        <thead>
          <tr>
            <th class="thID">ID</th>
            <th class="thNombre">Nombre</th>
            <th class="thCorreo">Correo</th>
            <th class="thGrupo">Grupo</th>
            <th class="thBorrar">Borrar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estudiante in listado" :key="estudiante.id">
            <td>{{ estudiante.id }}</td>
            <td>{{ estudiante.name }}</td>
            <td>{{ estudiante.email }}</td>
            <td>{{ estudiante.group }}</td>
            <td>
              <button @click="borrarUsuario(estudiante.id)" class="btTabla">Borrar</button>
              <button @click="buscarUsuario(estudiante.id)" class="btTabla btDetalles">Detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.viewHome{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  margin: 1.5rem;
}
th{
  background-color: rgb(0, 163, 22);
  font-weight: bold;
}
td{
  background-color: rgb(12, 97, 23);
}
td, th{
  padding: 0.25rem 0.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  border: 2px solid black;
}
.tablaContainer{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
table{
  width: 90%;
  border-collapse: collapse;
}
.thID{
  width: 5%;
}
.thNombre{
  width: 40%;
}
.thCorreo, thGrupo{
  width: 20%;
}
.thBorrar{
  width: 10%;
}
.formulario{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  margin-bottom: 1rem;
}
.formulario *{
  margin-right: 0.5rem;
  font-size: 1rem;
  height: 1.5rem;
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
.btTabla{
  border-radius: 0.3125rem;
}
input[type="number"]{
  text-align: center;
}
.btDetalles{
  margin-left: 0.5rem;
}
.frm{
  display: flex;
  flex-direction: flex-start;
  align-items: flex-start;
  justify-content: center;
  margin: 1rem;
}
</style>
