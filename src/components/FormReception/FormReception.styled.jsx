import { Stack } from '@mui/joy'
import styled from 'styled-components'
import TextareaAutosize from '@mui/base/TextareaAutosize';


export const Form = styled.form`
display:flex;
flex-direction: column;
align-items:center;
width: 100%;

`

export const MarginItem = styled(Stack)`

width: 280px;
@media screen and (min-width: 768px){
width: 500px;
}
`
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };



  export const StyledTextarea = styled(TextareaAutosize)
    `
box-sizing: border-box;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color:  ${grey[900]};
    background: #fff'};
    border: 1px solid ${grey[200]};
    box-shadow: 0px 2px 2px ${ grey[50]};
    width: 280px;
@media screen and (min-width: 768px){
width: 500px;
}
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `


