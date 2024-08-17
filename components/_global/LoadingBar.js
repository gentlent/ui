import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Router } from 'next/router';
import { ThemeContext } from '../../context/theme.context';
import {
  boxShadow, convertColorHexToRgb, emphasize, transitions,
} from '../../utils/themes/vars';

const StyledLoadingBar = styled.div`
  display: none;
  pointer-events: none;

  ${({ pageLoading }) => pageLoading && `
    display: block;
  `}

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    pointer-events: none;
    display: block;
    width: 100%;
    transform-origin: center left;
    transform: translateX(-70%) scaleX(0.25);

    animation: globalLoadingBar 2s ${transitions.default} infinite forwards;
    animation-delay: 0.5s;
    @keyframes globalLoadingBar {
      0% {
        transform: translateX(-70%) scaleX(0.25);
      }
      50% {
        transform: translateX(25%) scaleX(0.5);
      }
      100% {
        transform: translateX(120%) scaleX(0.25);
      }
    }

    box-shadow: ${boxShadow.light};
    background: ${({ theme }) => theme.primary};
    z-index: 999999999;
  }

  &::after {
    display: block;
    content: "";
    background: ${({ theme }) => `rgba(${convertColorHexToRgb(theme.primary)}, ${emphasize.disabled})`};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 999999998;
    pointer-events: none;
    opacity: 0;
    filter: invert(1);

    animation: showBackground 0.5s ${transitions.default} forwards;
    animation-delay: 0.5s;
    @keyframes showBackground {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

export default function LoadingBar() {
  const [pageLoading, setPageLoading] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setPageLoading(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setPageLoading(false);
  });

  Router.events.on('routeChangeError', () => {
    setPageLoading(false);
  });

  const { theme } = useContext(ThemeContext);
  return <StyledLoadingBar pageLoading={pageLoading} theme={theme} />;
}
