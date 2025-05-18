import { useState } from "react"
import { api } from "../services/api"

const NovaTransacao = () => {
  const [tipo, setTipo] = useState<string>("")
  const [valor, setValor] = useState<number>()
  const [descricao, setDescricao] = useState<string>("")
  const [categoria, setCategoria] = useState<string>("")

  async function handleSubmit() {
    if (!tipo || !valor || !descricao || !categoria) {
      alert("Preencha todos os campos!")
    }
    try {
      await api.post("/transacao", {
        tipo: tipo,
        valor: valor,
        descricao: descricao,
        categoria: categoria,
      })
      alert("Transação efetuada com sucesso!")
    } catch (err: any) {
      alert("Algo errado aconteceu, verifique novamente as informações!")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-9/10 w-9/10">
      <h1 className="h-1/5 w-9/10 flex flex-col justify-start items-start text-2xl text-gray-900 mt-8">
        Nova Transação
      </h1>
      <div className="h-1/3 w-full flex flex-col justify-center items-center text-gray-900">
        <div className="flex flex-row justify-between items-center w-9/10 h-9/10 gap-2">
          <select
            id="tipo"
            className="flex flex-col w-full h-1/2 bg-gray-300 border-gray-500 border-2 rounded-md justify-center items-center text-center cursor-pointer"
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value)
            }}
          >
            <option value="" disabled hidden>
              Tipo
            </option>
            <option value="entrada" className="cursor-pointer">
              Entrada
            </option>
            <option value="saida" className="cursor-pointer">
              Saída
            </option>
          </select>
          <select
            id="categoria"
            className="flex flex-col w-full h-1/2 bg-gray-300 border-gray-500 border-2 rounded-md justify-center items-center text-center cursor-pointer"
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value)
            }}
          >
            <option value="" disabled hidden>
              Categoria
            </option>
            <option value="Alimentação" className="cursor-pointer">
              Alimentação
            </option>
            <option value="Despesas" className="cursor-pointer">
              Despesas
            </option>
            <option value="Lazer" className="cursor-pointer">
              Lazer
            </option>
            <option value="Salário" className="cursor-pointer">
              Salário
            </option>
            <option value="Freelances" className="cursor-pointer">
              Freelances
            </option>
            <option value="Investimentos" className="cursor-pointer">
              Investimentos
            </option>
          </select>
          <input
            type="number"
            id="valor"
            placeholder="Valor"
            className="flex flex-col w-full h-1/2 bg-gray-300 border-gray-500 border-2 rounded-md pl-2"
            value={valor}
            onChange={(e) => {
              setValor(Number(e.target.value))
            }}
          />
        </div>
      </div>
      <div className="h-1/3 w-full flex flex-col justify-center items-center text-gray-900">
        <input
          type="text"
          id="descricao"
          placeholder="Descrição"
          className="flex flex-col w-9/10 h-1/2 bg-gray-300 border-gray-500 border-2 rounded-md pl-2"
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value)
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center h-1/3 w-9/10">
        <button
          className="cursor-pointer rounded-md bg-gray-900 gap-2 p-2 font-bold text-white"
          onClick={handleSubmit}
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}

export default NovaTransacao
