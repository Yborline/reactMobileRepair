import { styled } from "styled-components";


export const Div = styled.div`
display:flex;
flex-direction:column;
align-items: center;
margin-right: ${({marginright}) => marginright};
margin-bottom: ${({marginbottom}) =>marginbottom }
`


export const Label = styled.label`
text-align: center;
width: ${props=> props.width};`


