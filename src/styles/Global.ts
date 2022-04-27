import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  #root {
    font: 16px/1.4 'Roboto', sans-serif;
    background: lightskyblue;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
`
export default Global
