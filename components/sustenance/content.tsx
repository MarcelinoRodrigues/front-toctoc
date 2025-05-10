export const Sustenance = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white border border-yellow-300 shadow-md rounded-xl px-8 py-6 max-w-lg w-full mx-4 text-center">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">⚠️ Em manutenção</h2>
          <p className="text-gray-700 text-base mb-2">
            Esta seção da aplicação está temporariamente em manutenção.
          </p>
        </div>
      </div>
    </div>
  )
}