import { Stack } from '@mui/joy'
import styled from 'styled-components'

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


