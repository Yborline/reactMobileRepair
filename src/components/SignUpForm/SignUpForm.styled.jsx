import styled from "styled-components";

export const Div = styled.div`

color: ${({theme})=> theme.textBlack}
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

export const ButtonClose = styled.button`
height: 30px;`

export const ButtonLog = styled.button`
margin-top: 15px;
width:100%;
height: 30px;
`

export const DivClose = styled.div`
display:flex;
justify-content: space-between`


export const Li = styled.li`
margin-bottom: 10px;
width:100%;`



export const Input = styled.input`
height: 30px;
width:100%;
border-radius:5px;`


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