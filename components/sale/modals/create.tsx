import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

export const Create = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="mb-1 hover:cursor-pointer"
                >
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar venda</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">Nome</label>
                        <Input
                            name="name"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="quantity" className="text-right">Quantidade</label>
                        <Input
                            name="quantity"                        
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="amount" className="text-right">Preço</label>
                        <Input
                            name="amount"                        
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="observation" className="text-right">Observação</label>
                        <Input
                            name="observation"                           
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="unitMeasure" className="text-right">Unidade de Medida</label>
                        <Input
                            name="unitMeasure"                          
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="hover:cursor-pointer">
                        Criar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
