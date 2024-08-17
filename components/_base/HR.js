import { useContext } from 'react';
import styled from 'styled-components';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';

const StyledHR = styled(BaseComponent)`
  height: 1px;
  background-color: ${(props) => props.theme.borderColor};
`;

export default function HR(props) {
  const { theme } = useContext(ThemeContext);

  return <StyledHR elementType="hr" marginY={4} theme={theme} {...props} />;
}
