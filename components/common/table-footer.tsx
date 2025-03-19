import { FC } from "react";
import { TableCell, TableFooter, TableRow } from "../ui/table"

interface FooterProps {
    col: number;
    total: number;
}

export const Footer: FC<FooterProps> = ({ col, total }) => {
    return (
        <TableFooter>
            <TableRow>
                <TableCell colSpan={col}>Valor Total</TableCell>
                <TableCell>${total.toFixed(2)}</TableCell>
            </TableRow>
        </TableFooter>
    )
}