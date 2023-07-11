import { Stack } from '@mui/joy'
import styled from 'styled-components'
import TextareaAutosize from '@mui/base/TextareaAutosize';


export const Form = styled.form`
display:flex;
flex-direction: column;
align-items:center;
width: 100%;
position: relative;


`

export const MarginItem = styled(Stack)`

width:100%;
@media screen and (min-width: 768px){
width: 700px;
}
`



  export const StyledTextarea = styled(TextareaAutosize)
    `
box-sizing: border-box;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color:  ${({theme})=> theme.textAreaColor};
    background: #fff;
    border: 1px solid ${({theme})=> theme.borderTextArea};
    box-shadow: 0px 2px 2px ${({theme})=> theme.borderTextArea};
width: 100%;
@media screen and (min-width: 768px){
  min-width: 700px;
width: 500px;
max-width: 500px;
min-height: 60px;
max-height: 100px;
}
  
    &:hover {
      border-color: ${({theme})=> theme.hoverBorderTextArea};
    }
  
    &:focus {
      border-color: ${({theme})=> theme.hoverBorderTextArea};
      box-shadow: 0 0 0 3px ${({theme})=> theme.hoverShadowTextArea};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `




