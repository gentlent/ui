import { useContext } from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/themes/vars';
import { ThemeContext, ThemeProvider } from '../../context/theme.context';
import BaseComponent from '../BaseComponent';

const StyledSection = styled(BaseComponent)`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  ${(props) => !Object.keys(props).find((x) => x.startsWith('padding')) && `
    padding: ${props.theme.baseSpacingSize * 8}px 0;
  `}
  ${(props) => !Object.keys(props).find((x) => x.startsWith('margin')) && `
    margin: 0;
  `}
`;

export default function Section(props = {
  background: null,
  color: null,
}) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = colors[props.background] || theme.backgroundColor || colors.white;
  const color = colors[props.color] || theme.textColor || colors.black;

  return <ThemeProvider theme={{ ...theme, backgroundColor, textColor: color }}>
    <StyledSection {...props} backgroundColor={backgroundColor} color={color} theme={theme} elementType="section">
      {props.children}
    </StyledSection>
  </ThemeProvider>;
}
