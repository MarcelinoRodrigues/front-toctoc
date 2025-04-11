import { FC } from "react";

type WindownnwProps = {
  title: string;
  quantity: number;
};

export const Windownnw: FC<WindownnwProps> = ({ title, quantity }) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
        {title}
      </h2>
      <div className="bg-green-100 text-green-700 text-3xl font-bold rounded-xl py-6 text-center">
        {quantity ?? 0}
      </div>
    </div>
  );
};
