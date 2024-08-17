import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme.context';

const Paragraph = styled.p`
  margin: ${(props) => props.theme.baseSpacingSize * 3.333}px 0;
  
  ${(props) => props.noMargin && `
    margin: 0;
  `}
  ${(props) => props.noMarginTop && `
    margin-top: 0;
  `}
  ${(props) => props.noMarginBottom && `
    margin-bottom: 0;
  `}
`;

export default function P(props) {
  const { theme } = useContext(ThemeContext);
  return <Paragraph
    noMargin={props.noMargin}
    noMarginTop={props.noMarginTop}
    noMarginBottom={props.noMarginBottom}
    theme={theme}>{props.children}</Paragraph>;
}
