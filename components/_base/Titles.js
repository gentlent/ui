import styled, { css } from 'styled-components';
import { useContext } from 'react';
import {
  lineHeight, fontSize, fontWeight, fontStack,
} from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';

const BaseHeader = css`
  ${(props) => (!props.noMargin ? `
    margin-top: ${props.theme.baseSpacingSize * 3.333}px;
    margin-bottom: ${props.theme.baseSpacingSize * 3.333}px;
  ` : `
    margin-top: 0;
    margin-bottom: 0;
  `)}
  position: relative;
  scroll-margin-top: ${(props) => props.theme.baseSize * 2 + props.theme.baseSpacingSize * 3.333}px;
  hyphens: auto;

  @font-face {
    font-family: 'Gilroy';
    font-weight: ${fontWeight.bold};
    src: url("https://s1.gentcdn.com/fonts/Gilroy-Bold.woff2") format('woff2'),
        url("https://s1.gentcdn.com/fonts/Gilroy-Bold.woff") format('woff');
  }
  @font-face {
    font-family: 'Gilroy';
    font-weight: ${fontWeight.medium};
    src: url("https://s1.gentcdn.com/fonts/Gilroy-Light.woff2") format('woff2'),
        url("https://s1.gentcdn.com/fonts/Gilroy-Light.woff") format('woff');
  }
  font-family: 'Gilroy', ${fontStack.default};
`;

const Header1 = styled.h1`
  ${BaseHeader}
  font-size: ${fontSize['3xl']}rem;
  line-height: ${lineHeight.normal}em;
  font-weight: ${fontWeight.bold};

  @media (max-width: 1080px) {
    font-size: ${fontSize.xxl}rem;
  }
`;

const Header2 = styled.h2`
  ${BaseHeader}
  font-size: ${fontSize.xxl}rem;
  line-height: ${lineHeight.normal}em;
  font-weight: ${fontWeight.bold};

  @media (max-width: 1080px) {
    font-size: ${fontSize.xl}rem;
  }
`;

const Header3 = styled.h3`
  ${BaseHeader}
  font-size: ${fontSize.xl}rem;
  line-height: ${lineHeight.normal}em;
  font-weight: ${fontWeight.semibold};

  @media (max-width: 1080px) {
    font-size: ${fontSize.large}rem;
  }
`;

const Header4 = styled.h4`
  ${BaseHeader}
  font-size: ${fontSize.large}rem;
  line-height: ${lineHeight.normal}em;
  font-weight: ${fontWeight.semibold};

  @media (max-width: 1080px) {
    font-size: ${fontSize.normal}rem;
  }
`;

const Header5 = styled.h5`
  ${BaseHeader}
  font-size: ${fontSize.normal}rem;
  line-height: ${lineHeight.normal}em;
  font-weight: ${fontWeight.semibold};

  @media (max-width: 1080px) {
    font-weight: ${fontWeight.medium};
  }
`;

const Header6 = styled(Header5)`
  font-weight: ${fontWeight.medium};
`;

const normalizeHeadingToId = (heading) => heading
  ?.replace?.(/[^a-zA-Z0-9-. ]/g, '')
  ?.replace?.(/\s+/g, '-')
  ?.replace?.(/-+/g, '-')
  ?.substring?.(0, 60);

export function H1(props) {
  const { theme } = useContext(ThemeContext);
  return <Header1
    id={props.id || normalizeHeadingToId(props.children)}
    noMargin={props.noMargin}
    theme={theme}
    style={props.style}>{props.children}</Header1>;
}

export function H2(props) {
  const { theme } = useContext(ThemeContext);
  return <Header2
    id={props.id || normalizeHeadingToId(props.children)}
    noMargin={props.noMargin}
    theme={theme}
    style={props.style}>{props.children}</Header2>;
}

export function H3(props) {
  const { theme } = useContext(ThemeContext);
  return <Header3
    id={props.id || normalizeHeadingToId(props.children)}
    noMargin={props.noMargin}
    theme={theme}
    style={props.style}>{props.children}</Header3>;
}

export function H4(props) {
  const { theme } = useContext(ThemeContext);
  return <Header4
    id={props.id || normalizeHeadingToId(props.children)}
    noMargin={props.noMargin}
    theme={theme}
    style={props.style}>{props.children}</Header4>;
}

export function H5(props) {
  const { theme } = useContext(ThemeContext);
  return <Header5
    id={props.id || normalizeHeadingToId(props.children)}
    noMargin={props.noMargin}
    theme={theme}
    style={props.style}>{props.children}</Header5>;
}

export function H6(props) {
  const { theme } = useContext(ThemeContext);
  return <Header6
    id={props.id || normalizeHeadingToId(props.children)}
    noMargin={props.noMargin}
    theme={theme}
    style={props.style}>{props.children}</Header6>;
}
