import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    width: 100%;
  }
  body {
    box-sizing: border-box;
  }
`;
