import styled from "@emotion/styled";




export const ContainerContent = styled.div`


height: 100%;
box-sizing: border-box;
padding:70px 20px 0px 20px;
filter:${(props) => props.load ? `blur(3px)` : `blur(0px)`};`


export const Container = styled.div`

height: 100vh;`