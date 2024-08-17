import styled from 'styled-components';
import { useContext } from 'react';
import {
  getFontSize, fontSize, emphasize, breakpointWidth, colors, fontWeight, fontStack,
} from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';
import BaseComponent from '../BaseComponent';

const TextStyleElement = styled(BaseComponent)`
  display: inline-block;

  ${(props) => props.block && `
    display: block;
  `}

  ${(props) => props.center && `
    display: block;
    text-align: center;
  `}

  ${(props) => props.centerOnDesktop && `
    @media (min-width: ${breakpointWidth}px) {
      display: block;
      text-align: center;
    }
  `}

  ${(props) => props.right && `
    display: block;
    text-align: right;
  `}

  ${(props) => props.rightOnDesktop && `
    @media (min-width: ${breakpointWidth}px) {
      display: block;
      text-align: right;
    }
  `}

  ${(props) => props.left && `
    display: block;
    text-align: left;
  `}

  ${(props) => props.leftOnDesktop && `
    @media (min-width: ${breakpointWidth}px) {
      display: block;
      text-align: left;
    }
  `}
  
  ${(props) => props.small && `
    font-size: ${getFontSize(props.theme, fontSize.small)}px;
    line-height: 1.4em;
  `}

  ${(props) => props.muted && `
    opacity: ${emphasize[props.muted] || emphasize.disabled};
  `}

  ${(props) => props.topMargin && `
    margin-top: ${props.theme.baseSpacingSize * 2}px;
  `}

  ${(props) => props.bottomMargin && `
    margin-bottom: ${props.theme.baseSpacingSize * 2}px;
  `}

  ${(props) => props.textColor && `
    color: ${colors[props.textColor]};
  `}

  ${(props) => props.fontWeight && `
    font-weight: ${fontWeight[props.fontWeight]};
  `}

  ${(props) => props.fontStack && `
    font-family: ${fontStack[props.fontStack]};
  `}

  ${(props) => props.fontSize && `
    font-size: ${getFontSize(props.theme, fontSize[props.fontSize] || props.fontSize)}px;
    line-height: 1.4em;
  `}

  ${(props) => props.gradient && `
    @supports (background-clip: text) {
      background: linear-gradient(to right, ${props.gradient.join(', ')});
      background-clip: text;
      text-fill-color: transparent;
    }

    @supports (-webkit-background-clip: text) {
      background: linear-gradient(to right, ${props.gradient.join(', ')});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}

  ${(props) => props.truncate && typeof props.truncate !== 'number' && `
    display: inline-block;
    overflow: hidden;
    
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  `}

  ${(props) => props.truncate && typeof props.truncate === 'number' && `
    display: box;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    line-clamp: ${props.truncate};
    -webkit-line-clamp: ${props.truncate};
  `}
`;

export default function TextStyle(props) {
  const { theme } = useContext(ThemeContext);

  const propsCopy = { ...props };

  if (!props.title && props.truncate) {
    propsCopy.title = props.children;
  }

  return <TextStyleElement elementType="span" theme={theme} {...propsCopy}>{props.children}</TextStyleElement>;
}
