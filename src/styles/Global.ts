import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  body {
    background: url("https://images.unsplash.com/photo-1652286483194-cab162dd37d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80") no-repeat;
    background-size: cover;
    font: 16px/1.4 'Roboto', sans-serif;
    color: #010140;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  #root {
    width: 100%;
  }
`;
export default Global;
