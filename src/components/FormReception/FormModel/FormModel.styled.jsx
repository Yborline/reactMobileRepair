import styled from "@emotion/styled";


export const Form = styled.form`
 position: relative;

display:flex;
flex-direction: column;
height: 100%;
justify-content: space-evenly;


`


export const Label = styled.label`
margin-bottom: 20px;`

export const DivInput = styled.div`
margin-bottom:20px;`

export const DivButton = styled.div`
display:flex;
justify-content: center;`

export const StyledLabel = styled.label`
  position: 'absolute',
  lineHeight: 1,
  top: 2px,
  color: blue,
  fontWeight: 500,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
 `