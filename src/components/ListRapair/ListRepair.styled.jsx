import { styled } from "styled-components";

export const Ul = styled.ul`

display: grid;
justify-items: center;
grid-template-columns: 1fr;

grid-column-gap: 0px;
grid-row-gap: 15px;
@media screen and (min-width: 768px){
    grid-template-columns: repeat(2, 1fr);

grid-column-gap: 2px;
grid-row-gap: 15px;

}
@media screen and (min-width: 1080px){
    grid-template-columns: repeat(3, 1fr);

grid-column-gap: 2px;
grid-row-gap: 30px;

}
@media screen and (min-width: 1280px){
    grid-template-columns: repeat(4, 1fr);

grid-column-gap: 2px;
grid-row-gap: 30px;

}


@media screen and (min-width: 1600px){
    grid-template-columns: repeat(5, 1fr);

grid-column-gap: 2px;
grid-row-gap: 30px;

}
`