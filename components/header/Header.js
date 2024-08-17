import styled from 'styled-components';
import { useContext } from 'react';
import Container from '../container/Container';
import { ThemeContext } from '../../context/theme.context';

const HeaderElement = styled.div`
  background-color: ${(props) => props.theme.navBackground};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.navTextColor};
  padding: ${(props) => props.theme.baseSpacingSize * 6}px 0 ${(props) => props.theme.baseSpacingSize * 8}px;
  margin: 0 0 ${(props) => props.theme.baseSpacingSize * 4}px;
  position: relative;
  /*border-bottom-left-radius: ${(props) => props.theme.baseBorderRadius * 4}px;
  border-bottom-right-radius: ${(props) => props.theme.baseBorderRadius * 4}px;*/
  text-align: center;

  ${(props) => props.small && `
    padding: ${props.theme.baseSpacingSize * 4}px 0 ${props.theme.baseSpacingSize * 4}px;
  `}
`;

const CustomContainer = styled(Container)`
  & *:first-child {
    margin-top: 0px;
  }

  & *:last-child {
    margin-bottom: 0px;
  }
`;

export default function Header(props = {
  small: false,
}) {
  const theme = {
    ...useContext(ThemeContext).theme,
    ...props.theme,
  };

  return <HeaderElement theme={theme} style={props.style} small={props.small}>
    <CustomContainer>
      {props.children}
    </CustomContainer>
  </HeaderElement>;
}
