import styled, { ThemeProvider } from "styled-components";

export const Bg = styled.View`
  flex: 1;
  background-color: ${props => props.theme.body};
  justify-content: center;
  align-items: center;
`;

export const SmallFont = styled.Text`
  color: ${props => props.theme.text};
  fontSize: 20px;
`

export const SmallFontInv = styled.Text`
  color: ${props => props.theme.body};
  fontSize: 20px;
`
export const Title = styled.Text`
  color: ${props => props.theme.text};
  fontSize: 26px;
`
export const Btn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.text};
  borderRadius: 30px;
  display: flex;
  padding: 10px 15px;
`;
