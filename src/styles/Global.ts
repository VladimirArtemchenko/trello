import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  body{
    background: lightskyblue;
    font: 16px/1.4 'Roboto', sans-serif;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  #root {
width: 100%;
  }
`
export default Global
