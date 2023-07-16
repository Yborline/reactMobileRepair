import styled from "styled-components";

export const Div = styled.div`
margin-top: 20px;
color: ${({ theme }) => theme.textBlack};
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

export const H3 = styled.h3`
margin: 0px;`
export const Ul = styled.ul`
display: flex;
flex-direction:column;
margin: 0px;
padding: 0px;
align-items: center

`

export const DivClose = styled.div`
display:flex;
justify-content: space-between`


export const Li = styled.li`
margin-bottom: 10px;
width:100%;`


export const Error = styled.p`
text-align:center;
border : 1px solid;
border-radius: 7px;
width: 90%;
height: 25px;
border-color:${({ theme }) => theme.error};
margin-bottom: 10px; `


export const SpanError = styled.span`
color:${({ theme }) => theme.error}`
