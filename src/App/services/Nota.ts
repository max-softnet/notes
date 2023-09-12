import {Author} from "./Author";
import axios from "axios/index";
import {servicePath} from "./axios";

export class Nota {
  id?:number;
  title?:string;
  content?:string;
  author?: Author;
  date_created?:Date;
}

export const defaultNotes : Nota[] = [];
export const defaultNote : Nota = {};

const notes = axios.create({
  baseURL: `${servicePath}/Notes/`,
});


  export async function noteAll(): Promise<Nota[]> {

    let risposta: Nota[] | PromiseLike<Nota[]> =  []

    await notes
      .get('/')
      .then((result ) => {
        risposta = result.data
      })
      .catch((error) => {
        console.log(error.message)
      })
    return risposta

  }



