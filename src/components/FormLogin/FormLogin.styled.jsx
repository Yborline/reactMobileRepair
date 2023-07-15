import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";

export const Div = styled.div`
color: ${({ theme }) => theme.textBlack};
margin-top: 20px;
@media screen and (min-width: 768px){
    display:flex;
    flex-direction: column;
    align-items: center;
 
}
`
export const Form = styled.form`
@media screen and (min-width: 768px){
    width: 700px;
}
`

export const Ul = styled.ul`
display: flex;
flex-direction:column;
margin: 0px;
padding: 0px;
align-items: center

`

export const Error = styled.p`
text-align:center;
border : 1px solid;
border-radius: 4px;
width: 100%;
height: 30px;
border-color:${({ theme }) => theme.error};
margin-bottom: 10px; `



export const DivClose = styled.div`
display:flex;
justify-content: space-between`


export const Li = styled.li`
margin-bottom: 20px;
width:100%;`



export const Input = styled.input`
height: 30px;
width:100%;
border-radius:5px;`


export const LoadingBttn = styled(LoadingButton)`
width: 100%;`

export const SpanError = styled.span`
color:${({ theme }) => theme.error}`