import { Container } from "components/Container";
import { FC } from "react";
import logo from 'Image/aalto_it.png'


export const NavBar:FC = () => {
    return <div className={'navbar'}><Container>
        <img src={logo}></img>
        </Container> </div>
}