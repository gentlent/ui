import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme.context';
import { boxShadow } from '../../utils/themes/vars';

const StyledCard = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  padding: ${(props) => !props.noPadding && props.theme.baseSpacingSize * 4}px;
  box-shadow: ${boxShadow.medium};
  margin: ${(props) => props.theme.baseSpacingSize * 3.333}px 0;
  overflow: hidden;

  ${(props) => !props.noPadding && `
    & > *:last-child {
      margin-bottom: 0;
    }
  `}

  ${(props) => props.hoverable && `
    &:hover {
      border-color: ${props.theme.primary};
    }
  `}

  ${(props) => props.noMargin && `
    margin: 0;
  `}
`;

export default function Card(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledCard theme={theme} {...props}>
    {props.children}
  </StyledCard>;
}
