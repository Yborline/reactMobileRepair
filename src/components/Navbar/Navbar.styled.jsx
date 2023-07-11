import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Ul = styled.ul`
display: flex;
justify-content: space-evenly;
align-items: center;

`

export const Nav = styled.nav`
position:relative;

border-bottom: 1px solid ${({ theme }) => theme.thinLine};

`

export const Div = styled.div`

position:fixed;
width: 100%;
z-index: 20;
background-color: ${({theme})=> theme.navBar}

`

export const LiUser = styled.li`
display:flex;
align-items: center;
height: 36.5px;`

export const Link = styled(NavLink)`
color: ${({ theme }) => theme.link};
&:hover,
&.active{
 color: ${({theme}) => theme.activeLink}   
}
`