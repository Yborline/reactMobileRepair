import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

export const Ul = styled.ul`
width: 65vw;
display: flex;
flex-direction: column;
justify-content: flex-end`

export const Li = styled.li`
text-align:center;
height: 30px;

`

export const Div = styled.div`
text-align:right;
`

export const Link = styled(NavLink)`
color: ${({ theme }) => theme.link};
&:hover,
&.active{
 color: ${({theme}) => theme.activeLink}   
}
`