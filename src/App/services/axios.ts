import axios from "axios";

export const servicePath = axios.create({baseURL: `http://localhost:8080/api/v1/`});
