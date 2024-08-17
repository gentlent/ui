import {
  useState, useContext, useEffect, useRef, cloneElement,
} from 'react';
import styled from 'styled-components';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';
import { breakpointWidth, emphasize, transitions } from '../../utils/themes/vars';

const TabsNavigation = styled(BaseComponent)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  min-width: 100%;

  @media (max-width: ${breakpointWidth}px) {
    overflow-x: auto;
    overflow-y: hidden;
  }

  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: ${(props) => props.theme.baseSpacingSize * 2}px;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    height: 2px;
    background: ${(props) => props.theme.primary};

    left: ${(props) => props.underlineStyle.left}px;
    width: ${(props) => props.underlineStyle.width}px;
    transition: .2s ${transitions.default} all;
  }
`;

const Tab = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  position: relative;
  color: currentColor;

  @media (max-width: ${breakpointWidth}px) {
    white-space: nowrap;
  }

  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize}px;
  margin: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;
  margin-left: 0;

  opacity: ${emphasize.medium};

  &:hover {
    background: ${(props) => props.theme.sidebarHoverBackground};
    opacity: 1;
  }

  &:active {
    background: ${(props) => props.theme.sidebarActiveBackground};
    opacity: 1;
  }

  ${(props) => props.active && `
    opacity: 1;
  `};

  ${(props) => props.disabled && `
    pointer-events: none;
    opacity: ${emphasize.disabled};
  `}
`;

export default function Tabs(props) {
  const { theme } = useContext(ThemeContext);
  const navRef = useRef();

  const tabs = props.tabs.map((x, id) => ({
    id,
    ...x,
  }));

  const [tab, setTab] = useState(
    tabs.find((x) => x.active) || tabs[0],
  );

  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const { current } = navRef;

    if (current && current.querySelector('.active')) {
      setUnderlineStyle({
        width: current.querySelector('.active').clientWidth,
        left: current.querySelector('.active').offsetLeft,
      });
    }
  }, [setUnderlineStyle, navRef, tab]);

  return <>
    <TabsNavigation
      baseRef={navRef}
      theme={theme}
      {...props}
      underlineStyle={underlineStyle}>
      {tabs.map((x, i) => (
        <Tab
          theme={theme}
          key={i}
          active={tab.id === x.id}
          className={tab.id === x.id ? 'active' : ''}
          disabled={x.disabled}
          onClick={(e) => {
            // In case some manual behaviour is required
            if (x.onClick) {
              const allowDefaultBehaviour = x.onClick(e);
              if (!allowDefaultBehaviour) {
                return;
              }
            }

            setUnderlineStyle({
              width: e.target.clientWidth,
              left: e.target.offsetLeft,
            });

            // Continue with default behaviour
            setTab(x);
          }}>
          {x.name}
        </Tab>
      ))}
    </TabsNavigation>
    {cloneElement(tab.content, { ...props.props })}
  </>;
}
