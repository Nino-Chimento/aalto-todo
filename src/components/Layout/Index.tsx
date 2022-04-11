import { Footer } from "components/Footer";
import { NavBar } from "components/Navbar";
import { FC } from "react";

export const Layout:FC = ({children}) => {
    return <>
        <NavBar/>
        {children}
        <Footer/>
    </>
}