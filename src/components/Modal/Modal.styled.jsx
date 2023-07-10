import styled from "@emotion/styled";

export const Backdrop = styled.div`
z-index: 50;
position: fixed;
top: 0;
left:0;
width: 100vw;
height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);


`




export const ModalContent = styled.div`


padding:20px;
position: absolute;
bottom: 25%;
min-height:200px;
width: 100%;
border-radius: 8px;
box-shadow: 0px 2px 1px -1px rgba(0,0,0, 0.2),
0px 1px 1px 0px rgba(0,0,0, 0.14), 0px 1px 3px 0px rgba(0,0,0, 0.12);
background-color: #fff;
box-sizing: border-box;
@media screen and (min-width: 768px){


max-width:600px;
bottom: 40%;
left:22%;

}
@media screen and (min-width: 1600px){


max-width:600px;
bottom: 40%;
left:36%;
}
`