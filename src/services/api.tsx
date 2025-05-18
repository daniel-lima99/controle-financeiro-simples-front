import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json", //indica que o conteúdo da requisição será no formato json, honestamente não sei se isso é necessário
  },
})