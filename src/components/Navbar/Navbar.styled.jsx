import styled from "styled-components";


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