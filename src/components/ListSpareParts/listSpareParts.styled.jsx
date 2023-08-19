import { styled } from "styled-components";
import { Button } from '@mui/material';


export const BrandButton = styled(Button)`
width: 100%;

@media screen and (min-width: 768px){
    width: 300px;
}
@media screen and (min-width: 1280px){
    width: 700px;
}
`

export const Ul = styled.ul`
display:flex;
flex-direction:column;

`

export const ListModel = styled.ul`
margin-top:15px;
display:flex;
flex-wrap: wrap;


`

export const LiMain = styled.li`
display:flex;
flex-direction:column;
align-items: center;
`

export const LiModel = styled.li`
display:flex;
align-items: center;
justify-content: center;
padding: 0px 10px 0px 10px;
height: 30px;
text-align: center;
border-radius: 8px;
margin-bottom:10px;
margin-right:10px;
background-color: ${({theme})=> theme.sparePartsbutton}; 
`