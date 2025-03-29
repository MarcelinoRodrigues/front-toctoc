import { WindownnwProps } from "@/types/dashboard/types";
import { FC } from "react";

export const Windownnw: FC<WindownnwProps> = ({ title, quantity }) => {
  return (
    <div className="w-2xs h-full bg-white rounded-2xl p-4 m-2.5">
      <h2 className="text-center bg-gray-900 rounded-2xl mb-3 text-white">{title}</h2>
      <div>
        <h3 className="text-center bg-gray-900 text-white p-4 rounded-2xl">{quantity ?? 0}</h3>
      </div>
    </div>
  );
}