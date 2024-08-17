import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CustomLink from '../_base/Link';
import { emphasize, breakpointWidth, fontWeight } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';
import { GetTranslatedLink } from '../../utils';

const LinkElement = styled(CustomLink)`
  color: currentColor;
  display: inline-block;
  height: ${(props) => props.theme.baseSize / 4}px;
  line-height: ${(props) => props.theme.baseSize / 4}px;
  margin: 0 ${(props) => (((props.noMargin) ? 0 : props.theme.baseSpacingSize * 2) * 1.5)}px 0 ${(props) => ((props.noMargin) ? 0 : props.theme.baseSpacingSize)}px;
  padding: ${(props) => (props.theme.baseSize / 4) * 1.5}px 0;
  position: relative;

  @media (min-width: ${breakpointWidth}px) {
    ${(props) => (props.noMarginOnDesktop ? 'margin: 0;' : '')}
  }

  @media (max-width: ${breakpointWidth}px) {
    display: block;
    padding: ${(props) => (props.theme.baseSize / 4)}px 0;
    margin: 0 ${(props) => ((props.noMargin) ? 0 : props.theme.baseSpacingSize)}px 0 ${(props) => ((props.noMargin) ? 0 : props.theme.baseSpacingSize)}px;
  ${(props) => (props.noMarginOnDesktop ? `margin: 0 ${props.theme.baseSpacingSize * 5}px;` : '')}
  }

  opacity: ${emphasize.medium};
  text-decoration: none;

  &:visited {
    color: currentColor;
  }

  &:hover, &:focus {
    opacity: 1;
    text-decoration: none;
  }

  ${({ isActive }) => isActive && `
    opacity: 1;
    text-decoration: none;

    font-weight: ${fontWeight.medium};
  `}
`;

export default function NavigationLink(props) {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [active, setActive] = useState(false);

  let { href } = props;
  if (!props.locale && props.href.startsWith('/')) {
    href = GetTranslatedLink(`/${router.locale}${props.href}`);
  }

  useEffect(() => {
    setActive(window.location.pathname === href);
  }, [setActive, href]);

  return <LinkElement unstyled isActive={active} theme={theme} {...props}>
    {props.children}
  </LinkElement>;
}
