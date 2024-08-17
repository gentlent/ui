import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  getFontSize, fontSize, boxShadow,
  colors,
  breakpointWidth,
} from '../../utils/themes/vars';
import CustomLink from '../_base/Link';
import { ThemeContext } from '../../context/theme.context';
import Icon from '../_base/Icon';
import { FloatRight } from '../_base/Utils';

const StyledDropdown = styled.div`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
  line-height: 2em;
  font-size: ${(props) => getFontSize(props.theme, fontSize.normal)}px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  box-shadow: ${boxShadow.default};
  box-sizing: border-box;
  display: block;
  margin-top: ${(props) => props.theme.baseSpacingSize}px;
  max-width: 100vw;
  max-width: calc(100vw - ${(props) => props.theme.baseSpacingSize * 8}px);
  min-width: ${(props) => props.theme.baseSize * 3.33333}px;
  opacity: 0;
  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;
  pointer-events: none;
  transition: .1s all;
  position: absolute;
  
  @media (max-width: ${breakpointWidth}px) {
    ${(props) => !props.keepPositionOnMobile && `
      left: ${props.theme.baseSpacingSize * (props.right ? 4 : 0)}px;
      right: ${props.theme.baseSpacingSize * 4}px;
      transform: unset !important;
      width: 100vw;
    `}
  }
  
  z-index: 5;

  & > * {
    display: block;
  }

  ${(props) => (props.right ? `
    right: 0;
  ` : '')}

  ${(props) => (props.bottom ? `
    transform: translateY(-${props.theme.baseSpacingSize}px);
    top: 100%;
  ` : `
    transform: translateY(-${props.theme.baseSpacingSize * 2}px);
    bottom: 100%;
  `)}

  ${(props) => (props.opened && `
    opacity: 1;
    pointer-events: unset;

    ${props.bottom ? `
      transform: translateY(${props.theme.baseSpacingSize}px);
    ` : `
      transform: translateY(-${props.theme.baseSpacingSize}px);
    `}
  `)}
`;

const StyledDropdownLink = styled(CustomLink)`
  border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
  color: inherit;
  margin: 0 -${(props) => props.theme.baseSpacingSize * 1.25}px;
  padding: ${(props) => props.theme.baseSpacingSize * 0.75}px ${(props) => props.theme.baseSpacingSize * 1.5}px;
  text-decoration: none !important;
  user-select: none;
  line-height: inherit !important;

  &:hover {
    background: ${(props) => props.theme.sidebarHoverBackground};
  }

  &:active {
    background: ${(props) => props.theme.sidebarActiveBackground};
  }

  &:visited {
    color: inherit;
  }
`;

const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledDropdownDivider = styled.hr`
  background-color: ${(props) => props.theme.borderColor};
  border: none;
  height: 1px;
  margin: ${(props) => props.theme.baseSpacingSize}px -${(props) => props.theme.baseSpacingSize * 2}px;
`;

export function DropdownDivider(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledDropdownDivider theme={theme} {...props} />;
}

export function DropdownLink(props) {
  const { theme } = useContext(ThemeContext);

  return <StyledDropdownLink theme={theme} {...props} disabled={props.disabled || props.isSelected}>
    {props.icon && <>
      <Icon
        iconName={props.icon}
        iconSize={1}
        style={{ bottom: 0.5, right: 0 }}
      />
      &nbsp;
    </>}
    {props.children}
    {props.isSelected && <FloatRight>
      <Icon
        iconName={'circle-check'}
        iconFamily={'solid'}
        iconColor={colors['gray-400']}
        iconSize={1}
      />
    </FloatRight>}
  </StyledDropdownLink>;
}

export default function Dropdown(props) {
  const { theme } = useContext(ThemeContext);
  const [opened, setOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const onClick = (e) => {
      if (!(e.path || (e.composedPath && e.composedPath())).find((x) => x && x.classList && x.classList.contains('r-dropdown')) && !e.target.getAttribute('href')) {
        setOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleRouteChange = () => {
      setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return <DropdownContainer theme={theme} style={props.style}>
    {(props.children.map ? props.children : [props.children])
      .map((child) => (child && child?.props?.opener
        ? <React.Fragment key={Math.random().toString()}>
          {React.cloneElement(child, {
            className: `${child.props.className || ''} r-dropdown`,
            onClick: (e) => { e.preventDefault(); setOpen(!opened); },
          })}
          {child.props.caret && <>
            &nbsp;
            <Icon iconName={opened ? 'angle-up' : 'angle-down'} className="r-dropdown" style={{
              bottom: 0, right: 0, cursor: 'pointer', userSelect: 'none',
            }} onClick={() => { setOpen(!opened); }} />
          </>}
        </React.Fragment> : ''))}

    <StyledDropdown theme={theme} className="r-dropdown" opened={opened} bottom={props.bottom} right={props.right} keepPositionOnMobile={props.keepPositionOnMobile}>
      {(props.children.map ? props.children : [props.children])
        .map((child) => (child && !child?.props?.opener
          ? <React.Fragment key={Math.random().toString()}>
            {child}
          </React.Fragment> : ''))}
    </StyledDropdown>
  </DropdownContainer>;
}
