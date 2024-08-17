import styled from 'styled-components';
import { useContext } from 'react';
// import { } from '../../utils/themes/vars';
import Container from '../container/Container';
import Brand from './Brand';
import { ThemeContext } from '../../context/theme.context';

export { default as FooterLink } from './FooterLink';

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.footerBackground};
  color: ${(props) => props.theme.footerTextColor};
  padding: ${(props) => props.theme.baseSize / 2}px 0;
  margin-top: ${(props) => (!props.noMargin ? props.theme.baseSize : 0)}px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const StyledFooterBar = styled.div`
  margin-top: ${(props) => props.theme.baseSize}px;
`;

const StickyBottomPadding = styled.div`
  flex-grow: 1;
`;

export function FooterBar(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledFooterBar theme={theme}>
    {props.children}
  </StyledFooterBar>;
}

export default function Footer(props = {
  title: undefined,
  titleLink: undefined,
  logoUrl: undefined,
  logoLink: undefined,
  noMargin: false,
}) {
  const { theme } = useContext(ThemeContext);
  return <>
    <StickyBottomPadding />
    <StyledFooter theme={theme} noMargin={props.noMargin}>
      <Container>
        <Brand
          title={props.title}
          titleLink={props.titleLink}
          logoUrl={props.logoUrl}
          logoLink={props.logoLink}></Brand>
        {props.children}
      </Container>
    </StyledFooter>
  </>;
}
