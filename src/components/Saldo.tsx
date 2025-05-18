import { api } from "../services/api"
import { useState, useEffect } from "react"

const Saldo = () => {
  const [saldo, setSaldo] = useState<string>("")

  useEffect(() => {
    const getSaldo = async () => {
      const response = await api.get("/saldo")
      const formataSaldo = parseFloat(response.data).toFixed(2)
      setSaldo(formataSaldo)
    }
    getSaldo()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-9/10 w-9/10 bg-gray-300 rounded-md border-gray-700 border-2">
      <h1 className="h-1/2 w-full flex flex-col justify-center items-center text-3xl text-gray-900">
        Saldo Atual
      </h1>
      <span className="h-1/2 w-full flex flex-col justify-center items-center text-3xl font-bold text-gray-900">
        {saldo}
      </span>
    </div>
  )
}

export default Saldo
