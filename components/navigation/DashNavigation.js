import {
  cloneElement,
  createRef, useContext, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from '../_base/Link';
import Icon from '../_base/Icon';
import { ThemeContext } from '../../context/theme.context';
import {
  transitions, breakpointWidth, emphasize, fontWeight, colors,
} from '../../utils/themes/vars';
import { GetTranslatedLink, filterChildren } from '../../utils';
import TextStyle from '../_base/TextStyles';
import BaseComponent from '../BaseComponent';

const sidebarWidth = 256;

// --------------------------------------------

const StyledSidebarDivider = styled.div`
  height: 1px;
  margin: ${(props) => props.theme.baseSpacingSize * 2}px 0;
  background: ${(props) => props.theme.sidebarBorderColor};
`;

export function DashSidebarDivider() {
  const { theme } = useContext(ThemeContext);

  return <StyledSidebarDivider theme={theme} />;
}

// --------------------------------------------

const StyledNavigation = styled.div`
  box-sizing: border-box;
  padding: ${(props) => props.theme.baseSpacingSize}px;
  display: flex;
  flex: 1 0;
  padding-right: ${(props) => props.theme.baseSpacingSize * 2}px;

  height: ${(props) => props.theme.baseSize}px;

  position: absolute;
  top: 0;
  right: 0;
  left: ${(props) => sidebarWidth + props.sidebarOffset}px;

  transition: left 0.2s ${transitions.default};

  @media (max-width: ${breakpointWidth}px) {
    min-width: 100vw;
  }
`;

const StyledNavigationLink = styled(Link)`
  display: inline-block;
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 2}px;
  line-height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 2 - 4}px;
  padding: 0 ${(props) => props.theme.baseSpacingSize * 2}px;
  margin-left: ${(props) => props.theme.baseSpacingSize}px;
  float: left;

  border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;

  &:hover {
    background: ${(props) => props.theme.sidebarHoverBackground};
  }

  &:active {
    background: ${(props) => props.theme.sidebarActiveBackground};
  }
`;

export function DashNavigationLink(props) {
  const { theme } = useContext(ThemeContext);

  return <StyledNavigationLink theme={theme} unstyled {...props}>
    {props.children}
  </StyledNavigationLink>;
}

const StyledNavigationText = styled.span`
  display: inline-block;
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 2}px;
  line-height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 2}px;
  padding: 0 ${(props) => props.theme.baseSpacingSize * 2}px;
  margin-left: ${(props) => props.theme.baseSpacingSize}px;

  border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;

  img {
    height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 4}px;
    width: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 4}px;
    margin-top: ${(props) => props.theme.baseSpacingSize}px;
    border-radius: 50%;
  }
`;

export function DashNavigationText(props) {
  const { theme } = useContext(ThemeContext);

  return <StyledNavigationText theme={theme} {...props}>
    {props.children}
  </StyledNavigationText>;
}

const NavLeft = styled.div`
  display: inline-block;
  flex: 1 0;
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 2}px;
`;

const NavRight = styled.div`
  display: inline-block;
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 2}px;
`;

export function DashNavigation(props) {
  const { theme } = useContext(ThemeContext);

  const toggleNav = (e) => {
    e.preventDefault();
    props.setSidebarOffset(props.sidebarOffset === 0 ? -sidebarWidth : 0);
  };

  return <StyledNavigation theme={theme} sidebarOffset={props.sidebarOffset}>
    <NavLeft theme={theme} style={{ display: 'flex' }}>
      {props.setSidebarOffset && <DashNavigationLink href="#" onClick={toggleNav}>
        <TextStyle muted="medium">
          <Icon iconName={props.sidebarOffset === 0 ? 'arrow-left' : 'bars'} iconSize={1.25} style={{ margin: 0, right: 0, bottom: 0 }} />
        </TextStyle>
      </DashNavigationLink>}

      <DashNavigationLink style={{
        flex: '1',
        opacity: props.sidebarOffset === 0 ? 0 : 1,
        display: props.sidebarOffset === 0 ? 'none' : 'inline-block',
        transition: `opacity 0.2s ${transitions.default}`,
        background: `url(${encodeURI(props.logoUrl)}) no-repeat center left`,
        backgroundSize: 'auto 50%',
        margin: `0 ${theme.baseSpacingSize * 2}px`,
      }} href={props.titleUrl || '/'}>
        {!props.logoUrl ? props.title : ' '}
      </DashNavigationLink>

      {filterChildren(props.children, (child) => !child.props?.right)}
    </NavLeft>
    <NavRight theme={theme}>
      {filterChildren(props.children, (child) => child.props?.right)}
    </NavRight>
  </StyledNavigation>;
}

// --------------------------------------------

const StyledSidebar = styled.div`
  height: 100%;
  width: ${sidebarWidth}px;

  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  bottom: 0;
  left: ${(props) => props.sidebarOffset}px;
  transition: left 0.2s ${transitions.default};
`;

const StyledSidebarBrand = styled.div`
  height: ${(props) => props.theme.baseSize}px;
  width: 100%;

  outline: 1px solid ${(props) => props.theme.sidebarBorderColor};
  z-index: -1;

  ${(props) => props.logoUrl && `
    background-image: url(${encodeURI(props.logoUrl)});
    background-size: auto 38%;
    background-repeat: no-repeat;
    background-position: center;
  `}


  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 4}px;
  text-align: center;
  line-height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 2}px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledSidebarNavigation = styled.div`
  flex: 1;

  overflow: auto;
  
  padding-top: ${(props) => props.theme.baseSpacingSize * 2}px;

  ${(props) => props.overflow === 'top' && `
    box-shadow: rgba(128, 128, 128, .25) 0px 4px 8px -4px inset, rgba(128, 128, 128, 0) 0px -4px 8px -4px inset;
  `}
  ${(props) => props.overflow === 'bottom' && `
    box-shadow: rgba(128, 128, 128, 0) 0px 4px 8px -4px inset, rgba(128, 128, 128, .25) 0px -4px 8px -4px inset;
  `}
  ${(props) => props.overflow === 'both' && `
    box-shadow: rgba(128, 128, 128, .25) 0px 4px 8px -4px inset, rgba(128, 128, 128, .25) 0px -4px 8px -4px inset;
  `}
`;

function SidebarNavigation(props) {
  const SidebarNavRef = createRef();

  // Set Overflow Shadow
  const [overflow, setOverflow] = useState('none');
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = SidebarNavRef.current;
      if (scrollTop <= 0 && scrollHeight > clientHeight) {
        setOverflow('bottom');
      } else if (scrollTop === 0 && scrollHeight <= clientHeight) {
        setOverflow('none');
      } else if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
        setOverflow('top');
      } else {
        setOverflow('both');
      }
    };
    const sidebarNavRefCurrent = SidebarNavRef.current;
    SidebarNavRef.current.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      sidebarNavRefCurrent?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [SidebarNavRef]);

  return <StyledSidebarNavigation ref={SidebarNavRef} overflow={overflow} {...props}>
    {props.children}
  </StyledSidebarNavigation>;
}

export function DashSidebar(props = {
  title: null,
  titleUrl: null,
  logoUrl: null,
}) {
  const { theme } = useContext(ThemeContext);

  return <StyledSidebar theme={theme} sidebarOffset={props.sidebarOffset}>
    <Link href={props.titleUrl || '/'} unstyled>
      <StyledSidebarBrand theme={theme} logoUrl={props.logoUrl}>
        {!props.logoUrl && props.title}
      </StyledSidebarBrand>
    </Link>

    <SidebarNavigation theme={theme}>
      {filterChildren(props.children, (child) => !child?.props?.bottom)}
    </SidebarNavigation>

    {filterChildren(props.children, (child) => child?.props?.bottom)}
  </StyledSidebar>;
}

// --------------------------------------------

const StyledDashSidebarText = styled(BaseComponent)`
  border-top: 1px solid ${(props) => props.theme.sidebarBorderColor};
  padding: ${(props) => props.theme.baseSpacingSize * 2}px ${(props) => props.theme.baseSpacingSize * 4}px;
`;

export function DashSidebarText(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledDashSidebarText theme={theme} {...props}>
    {props.children}
  </StyledDashSidebarText>;
}

// --------------------------------------------

const StyledDashSidebarBox = styled(BaseComponent)`
  background: ${(props) => props.theme.sidebarHoverBackground};
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  margin: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;
  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;
`;

export function DashSidebarBox(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledDashSidebarBox theme={theme} {...props}>
    {props.children}
  </StyledDashSidebarBox>;
}

// --------------------------------------------

export const StyledDashSidebarLink = styled(Link)`
  display: block;
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  margin: 0 ${(props) => props.theme.baseSpacingSize * 2}px ${(props) => props.theme.baseSpacingSize * 2}px;

  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;

  color: ${(props) => colors[props.color] || props.theme.sidebarTextColor} !important;
  text-decoration: none !important;
  transition: background 0.05s ${transitions.default};
  position: relative;

  ${(props) => props.active && `
    background: ${props.theme.sidebarHoverBackground};

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: ${props.theme.baseSpacingSize * 1.25}px;      
      bottom: ${props.theme.baseSpacingSize * 1.25}px;
      width: 2px;
      background: ${colors[props.color] || 'currentColor'};
    }

    &:hover {
      background: ${props.theme.sidebarActiveBackground} !important;
    }

    &:active {
      background: ${props.theme.sidebarActivePressedBackground} !important;
    }
  `}

  &:hover {
    background: ${(props) => props.theme.sidebarHoverBackground};
  }

  &:active {
    background: ${(props) => props.theme.sidebarActiveBackground};
  }

  + .dashSidebarLink {
    margin-top: -${(props) => props.theme.baseSpacingSize}px;
  }

  ${({ textRight }) => textRight && `
    ::after {
      content: "${textRight}";
      font-weight: ${fontWeight.normal};
      float: right;
      opacity: ${emphasize.disabled};
      padding-left: ${(props) => props.theme.baseSpacingSize}px;
    }
  `}
`;

export function DashSidebarLink(props) {
  const { theme } = useContext(ThemeContext);

  // Set Active Link
  const router = useRouter();
  const [active, setActive] = useState(!!props.active);
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Trim potential language prefix (/de-de/)
      const normalizedUrl = url.replace(/^\/[a-zA-Z]{2}-[a-zA-Z]{2}\//, '/');
      if (typeof props.active === 'undefined') {
        setActive(GetTranslatedLink(normalizedUrl) === props.href || (normalizedUrl.startsWith(`${props.href}/`) && !props.exactMatch));
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(router.asPath);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events, props.href, router.asPath, props.active, props.exactMatch]);

  return <StyledDashSidebarLink theme={theme} active={active} className="dashSidebarLink" {...props}>
    {props.icon && <TextStyle muted={active ? false : 'medium'} color={props.color}>
      <Icon
        iconName={props.icon}
        iconFamily={active ? 'solid' : 'light'}
        iconColor={colors[props.color] || theme.sidebarTextColor}
        iconSize={1.333}
        style={{ bottom: '0.05em' }}
        marginRight={1} />
    </TextStyle>}
    {props.children}
  </StyledDashSidebarLink>;
}

// --------------------------------------------

const StyledBackground = styled.div`
  background: ${(props) => props.theme.sidebarBackground};
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;
`;

const StyledContainer = styled.div`
  background: ${(props) => props.theme.sidebarPageBackground};
  box-sizing: border-box;

  border-top: 1px solid ${(props) => props.theme.sidebarBorderColor};
  border-left: 1px solid ${(props) => props.theme.sidebarBorderColor};
  overflow: auto;

  position: absolute;
  top: ${(props) => props.theme.baseSize}px;
  left: ${(props) => sidebarWidth + props.sidebarOffset}px;
  right: 0;
  bottom: 0;

  ${(props) => props.sidebarOffset !== 0 && `
    border-top-left-radius: 0;
    border-left-width: 0;
  `}

  transition: all 0.2s ${transitions.default};

  ${(props) => !props.noInnerPadding && `
    padding: ${props.theme.baseSpacingSize * 4}px;
    padding-top: 0;
    @media (max-width: ${breakpointWidth}px) {
      padding: ${props.theme.baseSpacingSize * 4}px 0;
      padding-top: 0;
    }
  `}

  @media (max-width: ${breakpointWidth}px) {
    min-width: 100vw;
  }
`;

DashSidebar.defaultProps = {
  tag: 'DashSidebar',
};

DashNavigation.defaultProps = {
  tag: 'DashNavigation',
};

export function DashContainer(props = {
  noInnerPadding: false,
  sidebarElement: null,
  navigationElement: null,
}) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const [sidebarOffset, setSidebarOffset] = useState(0);
  useEffect(() => {
    if (window.innerWidth <= breakpointWidth) {
      setSidebarOffset(-sidebarWidth);
      router.events.on('routeChangeStart', () => {
        setSidebarOffset(-sidebarWidth);
      });
    }
  }, [router.events]);

  const { sidebarElement } = props;
  const { navigationElement } = props;
  let sidebar;
  let navigation;
  if (sidebarElement) {
    sidebar = cloneElement(
      sidebarElement || [],
      { sidebarOffset },
    );
  }
  if (navigationElement) {
    navigation = cloneElement(
      navigationElement || [],
      { sidebarOffset, setSidebarOffset },
    );
  }
  const { children } = props;

  return <StyledBackground theme={theme}>
    {sidebar}
    {navigation}
    <StyledContainer
      sidebarOffset={sidebarOffset}
      theme={theme}
      noInnerPadding={props.noInnerPadding}>
      {children}
    </StyledContainer>
  </StyledBackground>;
}
