'use client'

import { Button } from "../ui/button"
import { Delete } from "./modals/delete"
import { Edit } from 'lucide-react'

type Props = {
  id: string
}

export const ProductActions = ({ id }: Props) => {
  return (
    <div className="flex gap-2 justify-center">
      <Button onClick={() => { }} className="hover:cursor-pointer">
        <Edit/>
      </Button>
      <Delete id={id}/>
    </div>
  )
}
