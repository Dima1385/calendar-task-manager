import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  #root {
    min-height: 100%;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea, select {
    font-family: inherit;
  }

  ::selection {
    background: #0079bf33;
  }
`;
