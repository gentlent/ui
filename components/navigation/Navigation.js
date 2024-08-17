import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import themes from '../../utils/themes';
import {
  boxShadow, transitions, zIndex, convertColorHexToRgb, breakpointWidth,
} from '../../utils/themes/vars';
import Container from '../container/Container';
import Brand from './Brand';
import { ThemeContext } from '../../context/theme.context';
import BaseComponent from '../BaseComponent';

export { default as NavigationLink } from './NavigationLink';

const expandedNavHeight = (theme) => theme.baseSize + theme.baseSpacingSize * 2;

function ConditionalContainer(props) {
  if (props.show) {
    return <Container {...props}>{props.children}</Container>;
  }

  return <BaseComponent style={{
    width: '100%',
    padding: `0 ${props.theme.baseSpacingSize * 4}px`,
  }}>{props.children}</BaseComponent>;
}

const Nav = styled.nav`
  background-color: rgba(${(props) => convertColorHexToRgb(props.theme.navBackground)}, 0.95);
  color: ${(props) => props.theme.navTextColor};
  display: flex;
  height: ${(props) => expandedNavHeight(props.theme)}px;
  max-height: ${(props) => expandedNavHeight(props.theme)}px;
  box-shadow: ${(props) => (props.state.wasScrolled || props.state.menuOpened ? boxShadow.light : '0 0 0 0 rgba(0,0,0,0)')};
  border-bottom: 1px solid ${(props) => (props.state.wasScrolled || props.state.menuOpened ? props.theme.borderColor : 'transparent')};
  will-change: height, max-height, padding-top, padding-bottom;

  backdrop-filter: saturate(180%) blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: ${(props) => props.theme.baseSpacingSize}px 0;

  transition: border-bottom .2s ${transitions.default}, box-shadow .2s ${transitions.default};
  z-index: ${zIndex.navigation};

  & > div {
    display: flex;
  }
`;

const Spacer = styled.div`
  background-color: ${(props) => props.theme.navBackground};
  display: block;
  height: ${(props) => expandedNavHeight(props.theme)}px;

  ${(props) => props.isSecondary && `
    height: ${props.theme.baseSize}px;
    margin-bottom: -${props.theme.baseSize}px;
  `};
`;

const NavContent = styled.div`
  display: flex;
  flex: 1 0;
  position: relative;
  // overflow-x: auto;
  // overflow-y: hidden;
  white-space: nowrap;

  @media (max-width: ${breakpointWidth}px) {
    background-color: ${(props) => props.theme.navBackground};
    display: block;

    position: fixed;
    top: ${(props) => (expandedNavHeight(props.theme) - props.state.scrollAmount)}px;
    left: 0;
    right: 0;
    overflow: auto;
    transition: .2s ${transitions.default} all;

    height: calc(100vh - ${(props) => (expandedNavHeight(props.theme) - props.state.scrollAmount)}px);
    max-height: 0px;

    & > div {
      display: block;
      height: unset;
      flex: unset;
      margin: 0;
    }
    
    & > div > a, & > div > div {
      display: block;
      padding-left: ${(props) => props.theme.baseSpacingSize * 4}px;
      padding-right: ${(props) => props.theme.baseSpacingSize * 4}px;
    }
    
    ${(props) => (props.state.menuOpened ? `
      max-height: calc(100vh - ${expandedNavHeight(props.theme) - props.state.scrollAmount}px);
      border-bottom: 1px solid ${props.theme.borderColor};
      box-shadow: ${boxShadow.light};
      padding-top: ${props.theme.baseSpacingSize * 2}px;
      padding-bottom: ${props.theme.baseSpacingSize * 2}px;
    ` : '')}
  }
`;

const NavLeft = styled.div`
  display: inline-block;
  flex: 1 0;
  height: ${(props) => props.theme.baseSize}px;
  margin: 0 ${(props) => props.theme.baseSpacingSize * 4}px 0 0;

  @media (max-width: ${breakpointWidth}px) {
    display: block;
  }
`;

const NavRight = styled.div`
  display: inline-block;
  height: ${(props) => props.theme.baseSize}px;

  @media (max-width: ${breakpointWidth}px) {
    display: block;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const NavHamburgerIcon = styled.div`
  display: none;
  float: right;
  height: ${(props) => props.theme.baseSpacingSize * 3}px;
  width: ${(props) => props.theme.baseSpacingSize * 3}px;

  position: absolute;
  top: 50%;
  right: ${(props) => props.theme.baseSpacingSize * 4}px;
  transform: translateY(-50%);

  @media (max-width: ${breakpointWidth}px) {
    display: inline-block;
  }
`;

const NavHamburgerBar = css`
  background: ${(props) => props.theme.navTextColor};
  display: block;
  width: 100%;
  height: ${(props) => props.theme.baseSpacingSize / 8}px;
  transition: .2s ${transitions.default} all;
`;
const NavHamburgerBars = styled.div`
  ${NavHamburgerBar}

  transform: translateY(-50%);
  position: absolute;
  top: 50%;

  ${(props) => (props.state.menuOpened ? `
    background: transparent;
` : '')}

  &:before {
    content: '';
    ${NavHamburgerBar}
    position: absolute;
    top: ${(props) => props.theme.baseSpacingSize * 0.75}px;

    ${(props) => (props.state.menuOpened ? `
      transform: 
        translateY(-${props.theme.baseSpacingSize * 0.75}px)
        translateX(15%)
        rotate(-45deg);
      width: 80%;
    ` : '')}
  }

  &:after {
    content: '';
    ${NavHamburgerBar}
    position: absolute;
    bottom: ${(props) => props.theme.baseSpacingSize * 0.75}px;

    ${(props) => (props.state.menuOpened ? `
      transform: 
        translateY(${props.theme.baseSpacingSize * 0.75}px)
        translateX(15%)
        rotate(45deg);
      width: 80%;
    ` : '')}
  }
`;

export default function Navigation(props = {
  title: undefined,
  titleLink: undefined,
  logoUrl: undefined,
  logoLink: undefined,
}) {
  const { theme: themeContext } = useContext(ThemeContext);
  const theme = {
    ...themeContext,
    ...props.theme,
  };
  const { _isSecondary: isSecondary } = props;

  const [state, setState] = useState({
    init: false,
    wasScrolled: isSecondary || false,
    scrollAmount: isSecondary ? theme.baseSpacingSize * 2 : 0,
  });

  const [menuOpened, setMenuOpened] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onRouteChange = () => {
      setMenuOpened(false);
    };

    const onScroll = () => {
      if (isSecondary) {
        return;
      }

      setState(
        () => {
          const wasScrolled = document.scrollingElement.scrollTop
            > (theme.baseSpacingSize * 2);
          const scrollAmount = Math.max(0, Math.min(
            document.scrollingElement.scrollTop,
            theme.baseSpacingSize * 2,
          ));
          return {
            wasScrolled,
            scrollAmount,
            init: true,
          };
        },
      );
    };

    if (!state.init) {
      onScroll();
    }

    window.addEventListener('scroll', onScroll);
    router.events.on('routeChangeStart', onRouteChange);
    return () => {
      window.removeEventListener('scroll', onScroll);
      router.events.off('routeChangeStart', onRouteChange);
    };
  });

  return <>
    {isSecondary && <Spacer theme={theme} isSecondary={isSecondary} />}
    <Nav theme={theme} state={{ ...state, menuOpened }} style={{
      height: (theme) - state.scrollAmount,
      maxHeight: expandedNavHeight(theme) - state.scrollAmount,
      paddingTop: themes.default.baseSpacingSize - state.scrollAmount / 2,
      paddingBottom: themes.default.baseSpacingSize - state.scrollAmount / 2,
      ...(isSecondary && {
        position: 'sticky',
        top: `${theme.baseSize}px`,
        zIndex: zIndex.navigation - 1,
      }),
    }}>
      <ConditionalContainer theme={theme} show={!props.fullWidth}>
        <Brand
          title={props.title}
          titleLink={props.titleLink}
          logoUrl={props.logoUrl}
          logoLink={props.logoLink}
          theme={theme}
        />
        <NavContent theme={theme} state={{ ...state, menuOpened }}>
          <NavLeft theme={theme}>
            {((props.children || []).map ? (props.children || []) : [props.children]).map((child) => (!child.props.right ? <React.Fragment key={Math.random().toString()}>{child}</React.Fragment> : ''))}
          </NavLeft>
          <NavRight theme={theme}>
            {((props.children || []).map ? (props.children || []) : [props.children]).map((child) => (child.props.right ? <React.Fragment key={Math.random().toString()}>{child}</React.Fragment> : ''))}
          </NavRight>
        </NavContent>
        <NavHamburgerIcon theme={theme} onClick={() => { setMenuOpened(!menuOpened); }}>
          <NavHamburgerBars theme={theme} state={{ menuOpened }} />
        </NavHamburgerIcon>
      </ConditionalContainer>
    </Nav >
    {!isSecondary && <Spacer theme={theme} />}
  </>;
}
