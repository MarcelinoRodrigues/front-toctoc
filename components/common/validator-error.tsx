import { FC } from "react"

type ValidatorProps ={
    validator: string
    error: string
}

export const ValidatorError:FC<ValidatorProps> = ({validator,error}) => {
    return (
        <>
            {validator && (
                <p className="text-red-500 text-sm ml-auto mb-[-1rem]">
                    {error}
                </p>
            )}
        </>
    )
}