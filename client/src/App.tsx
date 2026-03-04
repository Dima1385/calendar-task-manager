import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles.js";
import { theme } from "./styles/theme.js";
import { Calendar } from "./components/Calendar/Calendar.js";

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Calendar />
  </ThemeProvider>
);
