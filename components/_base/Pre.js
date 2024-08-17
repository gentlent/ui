import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import {
  boxShadow, colors, emphasize, fontSize, fontStack, fontWeight, getFontSize,
} from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';

const StyledPre = styled.pre`
  background: ${colors['gray-50']};
  border: 1px solid ${colors['gray-100']};
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  box-shadow: ${boxShadow.light};
  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;
  margin: ${(props) => props.theme.baseSpacingSize * 2}px 0;
  font-family: ${fontStack.mono};
  font-size: ${(props) => getFontSize(props.theme, fontSize.small)}px;
  position: relative;

  ${(props) => props.title && `
    &::before {
      content: '${props.title}';
      display: block;
      font-family: ${fontStack.default};
      font-weight: ${fontWeight.medium};
      opacity: ${emphasize.medium};
      padding: 0 ${props.theme.baseSpacingSize * 2}px ${props.theme.baseSpacingSize}px;
      margin: 0 -${props.theme.baseSpacingSize * 2}px ${props.theme.baseSpacingSize}px;
      border-bottom: 1px solid ${props.theme.borderColor};

      position: sticky;
      left: -${props.theme.baseSpacingSize * 2}px;
    }
  `}
`;

export default function Pre(props) {
  const { theme } = useContext(ThemeContext);

  // On Click, select all text, but only if it's the first click and not moved
  useEffect(() => {
    window.mouseMoved = false;
    window.lastMouseCoords = { x: 0, y: 0 };

    const onMouseMove = () => {
      // If moved more than 10px, it's a drag
      if (Math.abs(window.lastMouseCoords.x - window.event.clientX) > 10
        || Math.abs(window.lastMouseCoords.y - window.event.clientY) > 10) {
        window.mouseMoved = true;
      }
    };

    const onMouseDown = () => {
      window.mouseMoved = false;
      window.lastMouseCoords = { x: window.event.clientX, y: window.event.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  const onClick = (e) => {
    if (e.detail === 1 && !window.mouseMoved && window.getSelection().toString().length === 0) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(e.target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return <StyledPre title={props.title} theme={theme} onClick={onClick}>
    {props.children}
  </StyledPre>;
}
