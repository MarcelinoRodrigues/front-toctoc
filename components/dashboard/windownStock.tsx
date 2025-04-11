import { FC } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type WindownStockProps = {
  inQty: number;
  outQty: number;
};

export const WindownStock: FC<WindownStockProps> = ({ inQty, outQty }) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e7eb]">
      <h2 className="text-lg font-semibold text-[#272727] text-center mb-4">
        Estoque
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between bg-[#e6f4f1] text-[#019267] rounded-xl px-4 py-2">
          <span className="flex items-center gap-2 font-medium">
            <ArrowDownCircle className="w-5 h-5" /> Entrada
          </span>
          <span className="text-lg font-bold">{inQty}</span>
        </div>

        <div className="flex items-center justify-between bg-[#ffe5e8] text-[#E63946] rounded-xl px-4 py-2">
          <span className="flex items-center gap-2 font-medium">
            <ArrowUpCircle className="w-5 h-5" /> Saída
          </span>
          <span className="text-lg font-bold">{outQty}</span>
        </div>
      </div>
    </div>
  );
};
