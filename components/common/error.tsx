import { Card, CardDescription, CardTitle } from "../ui/card"

export const Error = () => {
  return (
    <Card className="border border-gray-200 p-4 w-80 m-auto">
      <CardTitle className="text-gray-600">Nenhum Resultado encontrado</CardTitle>
      <CardDescription>Caso o problema persista, tente entrar em contato com o Administrador do Site</CardDescription>
    </Card>
  )
}