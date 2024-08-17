import styled from 'styled-components';
import { useContext } from 'react';
import { colors, fontStack } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';
import BaseComponent from '../BaseComponent';

const StyledCode = styled(BaseComponent)`
  background: ${colors['gray-50']};
  border: 1px solid ${colors['gray-200']};
  border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
  font-family: ${fontStack.mono};
  color: ${(props) => props.theme.textColor};
  padding: ${(props) => props.theme.baseSpacingSize * 0.25}px ${(props) => props.theme.baseSpacingSize * 0.5}px;
`;

export default function Code(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledCode elementType="code" theme={theme} {...{ style: props.style }}>
    {props.children}
  </StyledCode>;
}
