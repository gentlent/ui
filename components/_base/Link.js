import NextLink from 'next/link';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { cloneElement, useContext } from 'react';
import { emphasize, transitions } from '../../utils/themes/vars';
import { GetTranslatedLink } from '../../utils/i18n';
import { ThemeContext } from '../../context/theme.context';

const StyledLink = styled(NextLink)`
  @keyframes rocketLaunch {
    0% {
      transform: rotate(-45deg) translateX(0);
      opacity: 1;
    }
    49.9999% {
      transform: rotate(-45deg) translateX(1em);
      opacity: 0;
    }
    50% {
      transform: rotate(-45deg) translateX(-1em);
      opacity: 0;
    }
    100% {
      transform: rotate(-45deg) translateX(0);
      opacity: 1;
    }
  }

  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  &:hover .animRocket:after {
    animation: rocketLaunch .3s ${transitions.default};
  }

  &:hover .animWiggle {
    animation: wiggle .3s ${transitions.default};
  }

  // New Link Design
  text-decoration-thickness: 1px;
  text-underline-offset: 0.075em;
  color: ${(props) => props.theme.linkColor};
  text-decoration: underline;
  text-decoration-color: transparent;
  &:hover {
    text-decoration-color: ${(props) => props.theme.linkColor};
  }
  &:visited {
    color: ${(props) => props.theme.linkColor};
  }
  // End New Link Design

  ${(props) => props.highlight && `
    opacity: ${emphasize[props.muted] || emphasize.medium};
    text-decoration: none;
    color: inherit;

    &:visited {
      color: inherit;
    }

    &:hover, &:focus {
      opacity: 1;
      text-decoration: none;
    }
  `}

  ${(props) => props.unstyled && `
    text-decoration: none !important;
    color: inherit !important;
  `}

  ${(props) => props.underline && `
    text-decoration: underline !important;
    color: inherit !important;
  `}

  ${(props) => props.inheritColor && `
    color: inherit !important;
    &:hover, &:focus {
      text-decoration-color: inherit !important;
    }
  `}

  ${(props) => props.disabled && `
    pointer-events: none;
    opacity: ${emphasize.disabled};
    filter: grayscale(1);
  `}

  ${(props) => props.block && `
    text-decoration: none;
    display: block;

    &:hover, &:focus {
      text-decoration: none;
    }
  `}
`;

const iconCss = css`
  display: inline-block;
  height: 0.8em;
  line-height: 0.8em;
  margin-inline-start: 0.2em;
  margin-inline-end: 0.2em;
  position: relative;
  transition: 200ms all ${transitions.default};
  width: 0.8em;
`;

const IconExternal = styled.span`
  ${iconCss}
  right: 0.3em;
  &::after {
    content: "→";
    display: inline-block;
    transform: rotate(-45deg);
  }
`;

const IconEnvelope = styled.span`
  ${iconCss}
  background: url(https://icons.gentcdn.com/envelope?primary=${(props) => (props.iconColor || props.theme.linkColor).slice(1)}) no-repeat center center;
  bottom: -0.08em;
  right: 0.2em;
`;

const IconPhone = styled.span`
  ${iconCss}
  background: url(https://icons.gentcdn.com/phone?primary=${(props) => (props.iconColor || props.theme.linkColor).slice(1)}) no-repeat center center;
  bottom: -0.08em;
  right: 0.2em;
`;

const IconFax = styled.span`
  ${iconCss}
  background: url(https://icons.gentcdn.com/fax?primary=${(props) => (props.iconColor || props.theme.linkColor).slice(1)}) no-repeat center center;
  bottom: -0.08em;
  right: 0.2em;
`;

export default function Link(props = {
  href: null,
  external: false,
  iconColor: null,
  unstyled: false,
  underline: false,
  inheritColor: false,
  block: false,
  highlight: false,
}) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const attributes = {};

  // Add arrow, target, rel, etc. for external links
  if (props.external) {
    attributes.target = '_blank';
    attributes.rel = 'noopener noreferrer';
  }

  let { href } = props;
  let scroll;

  if (props.href.startsWith('#') && props.href !== '#') {
    scroll = false;
  }

  if (!props.locale && props.href.startsWith('/')) {
    href = GetTranslatedLink(`/${router.locale}${props.href}`);
  }

  let { children } = props;
  children ||= (href.startsWith('/')) ? `https://www.gentlent.com${href}` : href;

  if (props.scroll === false) {
    scroll = false;
  } else if (props.scroll === true) {
    scroll = true;
  }

  return <StyledLink {...props} {...attributes} theme={theme} href={href} scroll={scroll}
    onClick={(e) => {
      if (href.startsWith('#') && href !== '#') {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
        });
      }

      if (props.onClick) {
        return props.onClick(e);
      }

      return true;
    }}>
    {!props.noIcon && props.href.startsWith('mailto:') && <IconEnvelope theme={theme} className="animWiggle" iconColor={props.iconColor} />}
    {!props.noIcon && props.href.startsWith('tel:') && <IconPhone theme={theme} className="animWiggle" iconColor={props.iconColor} />}
    {!props.noIcon && props.href.startsWith('fax:') && <IconFax theme={theme} className="animWiggle" iconColor={props.iconColor} />}
    {!props.noIcon && props.external && <IconExternal theme={theme} className="animRocket" />}
    {children?.map?.((x) => {
      if (!props.highlight && !props.unstyled && !props.inheritColor && !props.block
        && !x?.props?.iconColor) {
        if (x?.props?.iconName || x?.props?.name) {
          // Add iconColor prop
          return cloneElement(x, {
            iconColor: theme.linkColor,
          });
        }
      }
      return x;
    }) || children}
  </StyledLink >;
}
