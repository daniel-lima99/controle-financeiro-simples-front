import { useEffect, useState } from "react"
import { api } from "../services/api"

interface Transacao {
  id: number
  descricao: string
  valor: number
  tipo: string
  data: string
  categoria: string
}

const Transacoes = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalDeletar, setModalDeletar] = useState(false)
  const [transacaoParaDeletar, setTransacaoParaDeletar] = useState<
    number | null
  >(null)
  const [transacaoEmEdicao, setTransacaoEmEdicao] = useState<Transacao | null>(
    null
  )

  const [filtroTipo, setFiltroTipo] = useState("")
  const [ordenacao, setOrdenacao] = useState<"asc" | "desc">("desc")
  const [classificacao, setClassificacao] = useState<"data" | "valor">("data")

  const fetchTransacoes = async () => {
    try {
      const response = await api.get("/transacoes", {
        params: {
          pagina: paginaAtual,
          tipo: filtroTipo,
          classificacao,
          ordenacao,
        },
      })
      const novasTransacoes = response.data.transacoes ?? []

      if (novasTransacoes.length === 0) {
        // Se for a primeira página, só mostra vazio
        if (paginaAtual === 1) {
          setTransacoes([])
        } else {
          // Se for outra página, volta uma página
          setPaginaAtual((p) => Math.max(p - 1, 1))
        }
        return // Evita sobrescrever com []
      }

      setTransacoes(novasTransacoes)
    } catch (err: any) {
      alert("Erro ao buscar transações!")
    }
  }

  useEffect(() => {
    fetchTransacoes()
  }, [paginaAtual, filtroTipo, ordenacao])

  const deletarTransacao = async () => {
    if (!transacaoParaDeletar) alert("Não há transação para deletar!")
    try {
      await api.delete(`/deletar/${transacaoParaDeletar}`)
      setModalDeletar(false)
      setTransacaoParaDeletar(null)
      fetchTransacoes()
    } catch (err: any) {
      alert("Erro ao deletar transação!")
    }
  }

  const editarTransacao = (transacao: Transacao) => {
    setTransacaoEmEdicao({ ...transacao })
    setModalEditar(true)
  }

  const salvarEdicao = async () => {
    try {
  await api.post(`/editar/${transacaoEmEdicao!.id}`, transacaoEmEdicao)
      setModalEditar(false)
      fetchTransacoes()
    } catch (err: any) {
      alert("Erro ao editar transação!")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-9/10 w-9/10">
      <div className="h-1/10 w-full flex flex-col justify-center items-start text-3xl text-gray-900 ">
        <h1>Transações</h1>
      </div>
      <div className="h-8/10 w-full flex flex-col justify-start items-stretch text-left overflow-y-auto bg-gray-300 text-gray-900">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>
                Valor
                <select
                  className="ml-2 text-sm"
                  onChange={(e) => {
                    setClassificacao("valor")
                    setOrdenacao(e.target.value as "asc" | "desc")
                  }}
                  value={classificacao === "valor" ? ordenacao : ""}
                >
                  <option value="" disabled hidden>↑↓</option>
                  <option value="asc">↑ Crescente</option>
                  <option value="desc">↓ Decrescente</option>
                </select>
              </th>
              <th>
                Tipo
                <select
                  className="ml-2 text-sm"
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  value={filtroTipo}
                >
                  <option value="">Todos</option>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </th>
              <th>
                Data
                <select
                  className="ml-2 text-sm"
                  onChange={(e) => {
                    setClassificacao("data")
                    setOrdenacao(e.target.value as "asc" | "desc")
                  }}
                  value={classificacao === "data" ? ordenacao : ""}
                >
                  <option value="" disabled hidden>↑↓</option>
                  <option value="asc">↑ Crescente</option>
                  <option value="desc">↓ Decrescente</option>
                </select>
              </th>
              <th>Categoria</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao: Transacao) => (
              <tr key={transacao.id}>
                <td>{transacao.descricao}</td>
                <td>R$ {Number(transacao.valor).toFixed(2)}</td>
                <td>{transacao.tipo}</td>
                <td>{new Date(transacao.data).toLocaleDateString()}</td>
                <td>{transacao.categoria}</td>
                <td>
                  <button
                    className="cursor-pointer p-1 m-1 rounded-md bg-gray-400 text-white"
                    onClick={() => editarTransacao(transacao)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="cursor-pointer p-1 m-1 rounded-md bg-red-400 text-white"
                    onClick={() => {
                      setTransacaoParaDeletar(transacao.id)
                      setModalDeletar(true)
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-1/10 w-full flex flex-row justify-between items-center text-gray-900 ">
        <button
          className="cursor-pointer rounded-md bg-gray-900 gap-2 p-2 text-white"
          onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
        >
          Anterior
        </button>
        <span className="cursor-pointer rounded-md bg-gray-900 gap-2 p-2 text-white">
          {paginaAtual}
        </span>
        <button
          className="cursor-pointer rounded-md bg-gray-900 gap-2 p-2 text-white"
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próxima
        </button>
      </div>
      {modalEditar && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl mb-4">Editar Transação</h2>
            <input
              type="text"
              className="border p-2 mb-2 w-full"
              value={transacaoEmEdicao?.descricao || ""}
              onChange={(e) =>
                setTransacaoEmEdicao({
                  ...transacaoEmEdicao!,
                  descricao: e.target.value,
                })
              }
              placeholder="Descrição"
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              value={transacaoEmEdicao?.valor || ""}
              onChange={(e) =>
                setTransacaoEmEdicao({
                  ...transacaoEmEdicao!,
                  valor: parseFloat(e.target.value),
                })
              }
              placeholder="Valor"
            />
            <select
              className="border p-2 mb-2 w-full cursor-pointer"
              value={transacaoEmEdicao?.tipo || ""}
              onChange={(e) =>
                setTransacaoEmEdicao({
                  ...transacaoEmEdicao!,
                  tipo: e.target.value,
                })
              }
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <select
              className="border p-2 mb-2 w-full cursor-pointer"
              value={transacaoEmEdicao?.categoria || ""}
              onChange={(e) =>
                setTransacaoEmEdicao({
                  ...transacaoEmEdicao!,
                  categoria: e.target.value,
                })
              }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Despesas">Despesas</option>
              <option value="Investimentos">Investimentos</option>
              <option value="Salário">Salário</option>
              <option value="Freelances">Freelances</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => setModalEditar(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer"
                onClick={salvarEdicao}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
      {modalDeletar && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl mb-4">Deletar Transação?</h2>
            <div className="flex justify-center gap-2">
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => {
                  setModalDeletar(false)
                  setTransacaoParaDeletar(null)
                }}
              >
                Não
              </button>
              <button
                className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
                onClick={deletarTransacao}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Transacoes
