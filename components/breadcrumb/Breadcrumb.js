import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme.context';
import BaseComponent from '../BaseComponent';
import {
  lineHeight, fontSize, emphasize,
} from '../../utils/themes/vars';

const StyledText = styled.span`
  display: inline-block;
  hyphens: auto;
  font-size: ${fontSize.normal}rem;
  line-height: ${lineHeight.normal}em;
  opacity: ${(props) => (props.itemNo === 0 ? 1 : emphasize.medium)};

  @media (max-width: 1080px) {
    font-size: ${fontSize.small}rem;
  }
`;

const StyledSeparator = styled(StyledText)`
  height: 1em;
  width: 1em;
  transform: translateX(-12.5%) translateY(25%) rotate(45deg) scale(${1 / 1.414 / 2});
  margin: 0 ${(props) => props.theme.baseSpacingSize}px;

  border-top: 2.818px solid currentColor;
  border-right: 2.818px solid currentColor;
  opacity: ${emphasize.medium};
`;

const StyledBreadcrumb = styled(BaseComponent)`
  display: block;
  margin: 0 0 ${(props) => props.theme.baseSpacingSize * 2}px;

  // Do not break lines, allow side scrolling
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export default function Breadcrumb(props = {
  items: [],
}) {
  const { theme } = useContext(ThemeContext);
  const items = [];

  for (let i = 0; i < props.items.length; i += 1) {
    items.push(<StyledText
      noMargin
      theme={theme}
      itemNo={props.items.length - 1 - i}>{props.items[i]}</StyledText>);
    if (i < props.items.length - 1) {
      items.push(<StyledSeparator theme={theme} />);
    }
  }

  return <StyledBreadcrumb theme={theme}>
    {items}
  </StyledBreadcrumb>;
}
