import React from "react"
import Saldo from "../components/Saldo"
import Transacoes from "../components/Transacoes"
import NovaTransacao from "../components/NovaTransacao"

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex flex-row h-1/10 w-full justify-between items-center bg-gray-300">
        <h1 className="ml-2 text-5xl font-sans font-bold text-gray-900">
          Controle Financeiro Pessoal
        </h1>
        {/* <button className="mr-5 cursor-pointer rounded-md bg-red-500 text-lg gap-2 p-2 text-white">
          Logout
        </button> */}
      </div>
      <div className="flex flex-row h-9/10 w-screen">
        <div className="h-full w-1/2">
          <div className="h-1/2 w-full flex justify-center items-center">
            <Saldo />
          </div>
          <div className="h-1/2 w-full  flex justify-center items-center">
            <NovaTransacao />
          </div>
        </div>
        <div className="h-full w-1/2  flex justify-center items-center">
          <Transacoes />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
