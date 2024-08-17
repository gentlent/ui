import styled from 'styled-components';
import { useContext } from 'react';
import { types } from './Badge';
import { ThemeContext } from '../../context/theme.context';
import BaseComponent from '../BaseComponent';
import { transitions } from '../../utils/themes/vars';

const StyledPill = styled(BaseComponent)`
  background-color: ${(props) => props.color.background};
  color: ${(props) => (props.currentColor ? 'currentColor' : props.color.textColor)};
  display: inline-block;
  font-size: 0.5em;
  font-weight: 500;
  padding: 0.3em 0.75em;
  height: 1.2em;
  line-height: 1.2em;
  border-radius: 1.2em;
  vertical-align: middle;
  transform: translateY(-.1em);
  margin: 0 0.2em;
  outline: 1px solid transparent;

  transition: all 0.2s ${transitions.default};

  ${(props) => props.hoverable && `
    cursor: pointer;
    background-color: transparent;
    outline: 1px solid ${props.color.background};
    &:hover, &:focus {
      color: ${props.color.textColor};
      background-color: ${props.color.background};    
  `}
`;

export default function Pill(props = {
  type: 'default',
  hoverable: false,
}) {
  const { theme } = useContext(ThemeContext);
  const color = { ...types[props.type] || types.default };

  return <StyledPill color={color} hoverable={props.hoverable} {...props} theme={theme} elementType={'span'}>
    {props.children}
  </StyledPill>;
}
