import { styled } from "styled-components";



export const LiCard = styled.li`

position: relative;
box-sizing: border-box;
width: 280px;
min-height: 435px;
display: flex;
flex-direction: column;
justify-content: space-between;
border: 1px solid ${({ theme }) => theme.borderList} ;
border-radius: 6px;
padding:20px 20px 20px 20px;
box-shadow: 10px 9px 15px -11px rgba(0,0,0,0.75);

&:hover{
box-shadow: 10px 9px 19px -7px rgba(0,0,0,0.75);
}
`

export const DivInfo = styled.div`
display: flex;
min-height: 40px;
justify-content: space-between;
align-items: center;
&:nth-of-type(1n+1){
border-bottom :  1px solid ${({ theme }) => theme.borderList};
}
&:nth-last-of-type(1) {
border-bottom: 0px;
margin-bottom: 10px;
}

`
export const DivTime = styled.div`
display: flex;
flex-direction:column;

&:nth-of-type(1n+1){
border-bottom :  1px solid ${({ theme }) => theme.borderList};
}
&:nth-last-of-type(1) {
border-bottom: 0px;
margin-bottom: 10px;
}
`
export const DivStatus = styled.div`
position: absolute;
top:67px;
left:0;
width: 100%;

text-align:center;
background-color: ${({theme ,status}) => status ==="start"? theme.statusRepairStart :theme.statusRepairFinish}
`

export const TitleCard = styled.h3`
height: 50px;
margin-bottom:20px;
`

export const DivButton = styled.div`
display:flex;`

// export const DivStatus = styled.div`
// position: absolute;
// top:0;
// left:0;
// width: 100%;
// height:100px;
// text-align:center;
// background-color: ${({theme}) => theme.statusRepairStart}
// `

// export const TitleCard = styled.h3`
// position: absolute;
// top:20px;

// z-index:2;`