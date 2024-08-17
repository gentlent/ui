import styled from 'styled-components';
import { useContext } from 'react';
import { breakpointWidth } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';

const StyledContainer = styled.div`
  display: block;
  margin: 0 auto;
  max-width: ${(props) => breakpointWidth - props.theme.baseSpacingSize * 4 * 2}px;
  width: 100%;

  @media (max-width: ${breakpointWidth}px) {
    padding: 0 ${(props) => props.theme.baseSpacingSize * 4}px;
  }
`;

export default function Container(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledContainer ref={props.innerRef} theme={theme}>
    {props.children}
  </StyledContainer>;
}
