import styled from "@emotion/styled";




export const ContainerContent = styled.div`
padding:70px 20px 0px 20px;
filter:${(props) =>props.load ? `blur(3px)`:`blur(0px)` };`