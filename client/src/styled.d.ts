import "styled-components";
import { Theme } from "./styles/theme.js";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
