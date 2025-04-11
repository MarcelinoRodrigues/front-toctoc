import { FC } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type WindownStockProps = {
  inQty: number;
  outQty: number;
};

export const WindownStock: FC<WindownStockProps> = ({ inQty, outQty }) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Estoque
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between bg-green-100 text-green-700 rounded-xl px-4 py-2">
          <span className="flex items-center gap-2 font-medium">
            <ArrowDownCircle className="w-5 h-5" /> Entrada
          </span>
          <span className="text-lg font-bold">{inQty}</span>
        </div>

        <div className="flex items-center justify-between bg-red-100 text-red-700 rounded-xl px-4 py-2">
          <span className="flex items-center gap-2 font-medium">
            <ArrowUpCircle className="w-5 h-5" /> Saída
          </span>
          <span className="text-lg font-bold">{outQty}</span>
        </div>
      </div>
    </div>
  );
};
