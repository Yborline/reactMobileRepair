import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
export const Container = styled.div`
    min-height: 500px;
    display: flex;
    flex-direction: column;
justify-content: flex-start;`

export const BtnContainer = styled.div`
display: grid;
margin-bottom: 20px;
grid-row-gap: 15px;
    @media screen and (min-width: 768px){
                margin-top: 20px;
    display:flex;
    justify-content: space-around;

}`


export const Bttn = styled(Button)`
width: 100%;
    @media screen and (min-width: 768px){
                height: 50px;
width: 220px;
    }
`

export const ContainerFilter = styled.div`
    @media screen and (min-width: 768px){
display:flex;
    align-items: flex-end;
    justify-content: center;
    }

    `