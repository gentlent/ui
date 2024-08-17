// with accordions as dropdowns
// Needs to stay inside the container. Preferably left aligned to the item, but can exceed size
// Make nav be a card
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NavigationLink from './NavigationLink';
import { ThemeContext, ThemeProvider } from '../../context/theme.context';
import Icon from '../_base/Icon';
import {
  boxShadow, breakpointWidth, transitions,
} from '../../utils/themes/vars';
import Link from '../_base/Link';
import TextStyle from '../_base/TextStyles';

export function NavDropdownTitle(props) {
  return <TextStyle truncate block marginBottom={1} fontWeight="medium" {...props}>
    {props.children}
  </TextStyle>;
}

const DropdownLink = styled(Link)`
  border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
  display: block;
  padding: ${(props) => props.theme.baseSpacingSize * 1}px ${(props) => props.theme.baseSpacingSize * 2}px;
  
  display: flex;
  align-items: stretch;

  white-space: initial;
  flex: 1 0;
  width: 200px;
  max-width: calc(50% - ${(props) => props.theme.baseSpacingSize * 4}px);

  @media (max-width: ${breakpointWidth}px) {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // height: calc(1em + ${(props) => props.theme.baseSpacingSize * 1.5}px);
  }
`;

export function NavDropdownLink(props) {
  const { theme } = useContext(ThemeContext);
  return <DropdownLink {...props} highlight theme={theme}>
    {props.icon && <TextStyle muted="medium" paddingRight={1}>
      <Icon iconName={props.icon} iconColor={theme.navTextColor} />
    </TextStyle>}
    <TextStyle>
      {props.children}
    </TextStyle>
  </DropdownLink>;
}

const DropdownFooter = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  border-bottom-left-radius: ${(props) => props.theme.baseBorderRadius - 1}px;
  border-bottom-right-radius: ${(props) => props.theme.baseBorderRadius - 1}px;
  background: ${(props) => props.theme.secondaryBackgroundColor};
  display: flex;
  width: 100%;
  flex: auto;
  margin: 
    ${(props) => props.theme.baseSpacingSize * 2}px
    ${(props) => -props.theme.baseSpacingSize * 4}px
    ${(props) => -props.theme.baseSpacingSize * 2}px;
  padding: 
    ${(props) => props.theme.baseSpacingSize * 2}px
    ${(props) => props.theme.baseSpacingSize * 4}px
    ${(props) => props.theme.baseSpacingSize * 2}px;

  @media (max-width: ${breakpointWidth}px) {
    display: none;
  }
`;

export function NavDropdownFooter(props) {
  const { theme } = useContext(ThemeContext);
  return <DropdownFooter theme={theme}>
    <ThemeProvider theme={{ ...theme, secondaryBackgroundColor: theme.borderColor }}>
      {props.children}
    </ThemeProvider>
  </DropdownFooter>;
}

const DropdownContainer = styled.div`
  @media (min-width: ${breakpointWidth}px) {
    position: absolute;
    background: ${(props) => props.theme.navBackground};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => props.theme.baseBorderRadius}px;
    box-shadow: ${boxShadow.medium};
    transform: translateY(${(props) => props.theme.baseSpacingSize * 2}px);
    padding: ${(props) => props.theme.baseSpacingSize * 2}px ${(props) => props.theme.baseSpacingSize * 4}px;
    right: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;

    transition: .2s all ${transitions.default};
    ${(props) => !props.opened && `
      pointer-events: none;
      opacity: 0;
      transform: translateY(0);
    `}
  }

  @media (max-width: ${breakpointWidth}px) {
    padding: 
      ${(props) => props.theme.baseSpacingSize}px 
      ${(props) => props.theme.baseSpacingSize * 7.5}px !important;

    ${(props) => !props.opened && `
      display: none !important;
    `}
  }
`;

export default function NavDropdown(props = {
  title: null,
}) {
  const { theme } = useContext(ThemeContext);
  const [opened, setOpenState] = useState(false);

  function setOpen(open) {
    setOpenState(open);
    document.querySelector('.backgroundBlur').classList[open ? 'add' : 'remove']('open');
  }

  const router = useRouter();
  useEffect(() => {
    const onClick = (e) => {
      if (!(e.path || (e.composedPath && e.composedPath())).find((x) => x && x.classList && x.classList.contains('r-nav-dropdown')) && !e.target.getAttribute('href')) {
        setOpen(false);
      }
    };

    const handleRouteChange = () => {
      setOpen(false);
    };

    window.addEventListener('click', onClick);
    window.addEventListener('scroll', handleRouteChange);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('scroll', handleRouteChange);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return <>
    <NavigationLink href="#"
      className="r-nav-dropdown"
      onClick={(e) => { e.preventDefault(); setOpen(!opened); }}
      disabled={props.disabled}
      right={props.right}>
      {props.title}
      &ensp;
      <Icon iconColor={theme.navTextColor} iconName={opened ? 'angle-up' : 'angle-down'} style={{ right: 0, margin: 0 }} onClick={(e) => { e.preventDefault(); setOpen(!opened); }} />
    </NavigationLink>
    <DropdownContainer theme={theme} opened={opened}>
      {props.children}
    </DropdownContainer>
  </>;
}
