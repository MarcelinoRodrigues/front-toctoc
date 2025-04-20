"use client"

import React, { useState, FC } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export type ExportDropdownProps = {
  options: Array<'PDF' | 'CSV' | 'Excel'>;
  onExport: (format: string) => void;
};

export const ExportDropdown: FC<ExportDropdownProps> = ({ options, onExport }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button onClick={() => setOpen(!open)} variant="outline" className="flex items-center gap-2">
        <DownloadIcon className="w-4 h-4" />
        Exportar
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onExport(opt.toLowerCase()); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};