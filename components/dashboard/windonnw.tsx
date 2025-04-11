import { FC } from "react";

type WindownnwProps = {
  title: string;
  quantity: number;
};

export const Windownnw: FC<WindownnwProps> = ({ title, quantity }) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
        {title}
      </h2>
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white text-3xl font-bold rounded-xl py-4 text-center">
        {quantity ?? 0}
      </div>
    </div>
  );
};

