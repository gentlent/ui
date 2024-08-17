import styled from 'styled-components';
import { useContext } from 'react';
import CustomLink from '../_base/Link';
import { emphasize } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';

const LinkElement = styled(CustomLink)`
  color: ${(props) => props.theme.footerTextColor};
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  text-decoration: none;
  
  ${(props) => (props.block ? `
    margin-bottom: ${props.theme.baseSpacingSize}px;
  ` : `
    margin-bottom: ${props.theme.baseSpacingSize / 2}px;
  `)}

  ${(props) => props.muted && `
    opacity: ${emphasize[props.muted] || emphasize.medium};
  `}

  &:visited {
    color: ${(props) => props.theme.footerTextColor};
  }

  &:hover, &:focus {
    opacity: 1;
    text-decoration: none;
  }
`;

export default function FooterLink(props) {
  const { theme } = useContext(ThemeContext);
  return <LinkElement theme={theme} iconColor={theme.footerTextColor} {...props}>
    {props.children}
  </LinkElement>;
}
