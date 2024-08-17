import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme.context';
import { transitions } from '../../utils/themes/vars';

const BackgroundBlurLayer = styled.div`
  dsplay: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 95;
  pointer-events: none;
  opacity: 0;
  transition: .2s all ${transitions.default};
  backdrop-filter: blur(0);
  will-change: opacity, backdrop-filter;

  &.open {
    pointer-events: all;
    opacity: 1;
    backdrop-filter: blur(10px);
  }
`;

export default function BackgroundBlur() {
  const { theme } = useContext(ThemeContext);
  return <BackgroundBlurLayer theme={theme} className="backgroundBlur" />;
}
