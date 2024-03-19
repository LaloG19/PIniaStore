import axios from "axios";
import { defineStore } from "pinia";
import type { IStudent } from "../interfaces/IStudent";
const ruta = 'https://65f8b9c1df151452460ff611.mockapi.io/api/v1';

export const useUsers = defineStore('Users',{
  state: () => ({
    ListStudents: [] as IStudent[],
    Student: {} as IStudent,
  }),
  getters:{
    GetStudents(state){
        return state.ListStudents;
    },
    GetStudent(state){
      return state.Student;
    }
  },
  actions:{
    async cargarEstudiantes(){
      try{
        const response = await axios.get(`${ruta}/users`);
        if(response.status === 200){
          this.ListStudents = response.data;
        }else{
          throw new Error('Error al cargar los estudiantes');
        }
      }catch(error){
        console.log(error);
      }
    },
    async buscarEstudiante(id: string){
      try{
        const response = await axios.get(`${ruta}/users/${id}`);
        if(response.status === 200){
          this.Student = response.data;
          return true;
        }
        else{
          throw new Error('Error al cargar el estudiante');
        }
      }catch(error){
        console.log(error);
        return false;
      }
    },
    async agregarEstudiante(data: IStudent){
      try{
        const response = await axios.post(`${ruta}/users`,data);
        if(response.status === 201){
          return true;
        }else{
          throw new Error('Error al agregar el estudiante');
        }
      }catch(error){
        console.log(error);
      }
    },
    async borrarEstudiante(id: string){
      try{
        const response = await axios.delete(`${ruta}/users/${id}`);
        if(response.status === 200){
          return true;
        }else{
          throw new Error('Error al borrar el estudiante');
        }
      }catch(error){
        console.log(error);
      }
    }
  }
})
