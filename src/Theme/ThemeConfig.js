import { createGlobalStyle } from "styled-components";
export const lightTheme = {
  statusRepairStart: "#FFD700",
  statusRepairFinish: "#90EE90",
  borderList: "#D3D3D3",
  textAreaColor: "#24292f",
  borderTextArea: "#d0d7de",
  shadowTextArea: "#f6f8fa",
  hoverBorderTextArea: "#3399FF",
  hoverShadowTextArea: "#b6daff",
  thinLine: "#708090",
  navBar: "#E6E6FA",
};

export const darkTheme = {
  statusRepairStart: "#FFD700",
  statusRepairFinish: "#00FF00",
};

export const GlobalStyles = createGlobalStyle`
  body {

    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    list-style: none;
  }`;

//   background: ${({ theme }) => theme.yelowLight};
// color: ${({ theme }) => theme.text};
