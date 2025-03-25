import { LayoutGrid, Table } from "lucide-react"
import { Button } from "../ui/button"
import { FC } from "react"

type CardViewProps = {
    isCardView: boolean
    handleCardView: (card: boolean) => void
}

export const CardView: FC<CardViewProps> = ({isCardView, handleCardView}) => {
    return (
        <div className="flex justify-start md:justify-end w-full md:w-auto">
            <Button
                variant="outline"
                onClick={() => handleCardView(!isCardView)}
                className="w-full md:w-auto"
            >
                {isCardView ? <Table /> : <LayoutGrid />}
            </Button>
        </div>
    )
}