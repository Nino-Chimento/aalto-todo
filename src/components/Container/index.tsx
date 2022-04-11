import { FC } from "react";

interface ContainerProps {
    className?:string
}

export const Container:FC<ContainerProps>= ({className,children}) => {
    return <div className="main-container">{children}</div>
}