import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

export const Ul = styled.ul`
width: 65vw;
display: flex;
flex-direction: column;
justify-content: flex-end;
padding-top:40px;`

export const Li = styled.li`
display:flex;
 align-items: center;
justify-content: center;
text-align:center;
height: 40px;
box-shadow: 2px 1px 7px -3px rgba(0,0,0,0.75);

`

export const Div = styled.div`
text-align:right;
`

export const Link = styled(NavLink)`
color: ${({ theme }) => theme.link};
&:hover,
&.active{
 color: ${({theme}) => theme.activeLink}   ;
}
`