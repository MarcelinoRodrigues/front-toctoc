import { TableCell, TableFooter, TableRow } from "../ui/table"

interface FooterProps {
    col: number;
    total: number;
}

export const Footer = ({ col, total }: FooterProps) => {
    return (
        <TableFooter className="sticky bottom-0 bg-white">
            <TableRow>
                <TableCell colSpan={col}>Valor Total</TableCell>
                <TableCell>${total.toFixed(2)}</TableCell>
            </TableRow>
        </TableFooter>
    );
};