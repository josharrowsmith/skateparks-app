import styled, { ThemeProvider } from "styled-components";

export const Bg = styled.View`
  flex: 1;
  background-color: ${props => props.theme.body};
  justify-content: center;
  align-items: center;
`;
