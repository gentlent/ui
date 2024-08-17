// Tooltip
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/theme.context';
import {
  colors, emphasize, transitions, fontSize, lineHeight, boxShadow,
} from '../../utils/themes/vars';

const StyledTooltip = styled.span`
  position: relative;
`;

const StyledTooltipContent = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: 
    translateX(-50%) 
    translateY(-${(props) => props.theme.baseSpacingSize * (props.hover ? 1 : 0.5)}px)
  ;

  font-size: ${fontSize.small}rem;
  line-height: ${lineHeight.small};

  box-shadow: ${boxShadow.medium};
  background: ${colors.black};
  border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
  color: ${colors.white};
  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 1.5}px;
  z-index: 1;

  opacity: ${(props) => (props.hover ? emphasize.high : 0)};
  transition: all 0.1s ${transitions.default};
  pointer-events: ${(props) => (props.hover ? 'auto' : 'none')};

  max-width: 200px;
  width: intrinsic;
  width: -moz-max-content;
  width: -webkit-max-content;
  width: max-content;
`;

export default function Tooltip(props) {
  const { theme } = useContext(ThemeContext);
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  if (typeof props.condition !== 'undefined' && !props.condition) {
    return <>
      {props.children}
    </>;
  }

  return <StyledTooltip
    theme={theme}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {props.children}
    <StyledTooltipContent theme={theme} hover={hover}>
      {props.content}
    </StyledTooltipContent>
  </StyledTooltip>;
}
