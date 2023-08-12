export class Note {
  id?: number;
  title?:string;
  author?:string;
  content?:string;
  data_create?:Date;
}

export const defaultNotes : Note[] = [];
export const defaultNote : Note = {};
