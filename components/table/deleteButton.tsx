"use client";

type DeleteButtonProps = {
  id: string;
  onDelete: (id: string) => void;
};

export function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  return (
    <button
      onClick={() => {
        const confirmed = window.confirm("Tem certeza que deseja excluir?");
        if (confirmed) {
          onDelete(id);
        }
      }}
      className="text-red-600 hover:text-red-800 transition text-sm"
    >
      Deletar
    </button>
  );
}
