import styled from 'styled-components';
import { useContext } from 'react';
import { transitions, colors, fontWeight } from '../../utils/themes/vars';
import themes from '../../utils/themes';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';

const StyledIcon = styled(BaseComponent)`
  display: inline-block;
  height: 0.8em;
  line-height: 0.8em;
  margin-inline-start: 0.2em;
  margin-inline-end: 0.2em;
  position: relative;
  transition: 200ms all ${transitions.default};
  width: 0.8em;
  vertical-align: middle;

  background: url(https://icons.gentcdn.com/${(props) => (props.iconFamily ? `${props.iconFamily}/` : '')}${(props) => props.iconName}${(props) => (props.iconColor ? `?primary=${props.iconColor.slice(1)}` : '')}) no-repeat center center ${(props) => (props.rounded ? '/cover' : '/contain')};

  ${(props) => !props.noMargin && `
    bottom: 0.05em;
    right: 0.2em;
  `}

  ${(props) => props.rounded && `
    height: 1em;
    width: 1em;
    line-height: 1em;
    border-radius: 50%;
  `}

  ${(props) => props.iconSize && `
    height: ${props.iconSize * 0.8}em;
    width: ${props.iconSize * 0.8}em;
    line-height: ${props.iconSize * 0.8}em;
  `}

  ${(props) => props.iconLabel && `
    &:after {
      content: '${props.iconLabel.replaceAll("'", '&#39;')}';
      color: ${props.theme.backgroundColor};
      border: 1px solid ${props.theme.backgroundColor};
      background-color: ${props.iconColor || props.theme.textColor};
      border-radius: 50%;
      display: block;
      font-size: 0.5em;
      text-align: center;

      height: 1.66666em;
      width: 1.66666em;
      line-height: 1.66666em;
      font-weight: ${fontWeight.medium};
      overflow: hidden;
      
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(38%, 38%);
    }
  `}

  ${(props) => props.rotating && `
    animation: 1s linear infinite rotate;

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`;

export default function Icon(props = {
  name: 'home',
  family: null,
  color: themes.default.textColor,
  size: 1,
  rounded: false,
  label: null,
  rotating: false,
}) {
  const { theme } = useContext(ThemeContext);
  const propsCopy = { ...props };
  if (props.name) {
    propsCopy.iconName = props.name;
    delete propsCopy.name;
  }
  if (props.family) {
    propsCopy.iconFamily = props.family;
    delete propsCopy.family;
  }
  if (props.color) {
    propsCopy.iconColor = props.color;
    delete propsCopy.color;
  }
  if (props.size) {
    propsCopy.iconSize = props.size;
    delete propsCopy.size;
  }
  if (props.label) {
    propsCopy.iconLabel = `${props.label}`;
    delete propsCopy.label;
  }

  const iconColor = (typeof propsCopy.iconColor === 'string' && propsCopy.iconColor.match(/#([0-9a-f]{3}|[0-9a-f]{6})/i))
    ? propsCopy.iconColor
    : colors[propsCopy.iconColor];

  return <StyledIcon data-icon elementType={'span'} theme={theme} {...propsCopy} iconColor={iconColor}></StyledIcon>;
}

const StyledLoading = styled(BaseComponent)`
  background: url(https://icons.gentcdn.com/loading) no-repeat center/contain;
  
  ${({ inline, iconSize }) => (!inline ? `
    display: block;
    height: ${(iconSize || 1) * 2}rem;
    min-width: ${(iconSize || 1) * 2}rem;
    margin: ${(iconSize || 1) * 2}rem 0;
  ` : `
    display: inline-block;
    height: 1em;
    width: 1em;
    transform: translateY(0.15em);
  `)}
`;

export function Loading(props = {
  size: 1,
  inline: false,
}) {
  const propsCopy = { ...props };
  if (props.size) propsCopy.iconSize = props.size;

  return <StyledLoading elementType={'span'} {...propsCopy} />;
}
