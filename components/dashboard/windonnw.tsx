import { FC } from "react";
import { TrendingUp } from "lucide-react";

type WindownnwProps = {
  title: string;
  quantity: number;
};

export const Windownnw: FC<WindownnwProps> = ({ title, quantity }) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e7eb] flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="text-[#019267] w-6 h-6" />
        <h2 className="text-xl font-semibold text-[#272727]">{title}</h2>
      </div>
      <div className="bg-[#019267] text-white text-4xl font-extrabold rounded-xl px-6 py-4 text-center w-full shadow-inner">
        {quantity ?? 0}
      </div>
    </div>
  );
};
