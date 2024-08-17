import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme.context';

import { colors, fontSize, getFontSize } from '../../utils/themes/vars';

export const types = {
  default: {
    background: colors['gray-50'],
    border: colors['gray-300'],
    textColor: colors['gray-600'],
  },
  gray: {
    background: colors['gray-200'],
    border: colors['gray-300'],
    textColor: colors['gray-600'],
  },
  info: {
    background: colors['blue-50'],
    border: colors['blue-300'],
    textColor: colors['blue-600'],
  },
  success: {
    background: colors['green-50'],
    border: colors['green-300'],
    textColor: colors['green-600'],
  },
  warning: {
    background: colors['yellow-50'],
    border: colors['yellow-300'],
    textColor: colors['yellow-600'],
  },
  error: {
    background: colors['red-50'],
    border: colors['red-300'],
    textColor: colors['red-600'],
  },
  blank: {
    background: 'transparent',
    border: 'transparent',
    textColor: colors['gray-600'],
  },
};

const StyledBadge = styled.span`
  background-color: ${(props) => props.color.background};
  border: 1px solid ${(props) => props.color.border};
  border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
  color: ${(props) => props.color.textColor};
  display: inline-block;
  font-size: ${(props) => getFontSize(props.theme, fontSize.small)}px;
  font-weight: 400;
  line-height: ${(props) => props.theme.baseLineHeight}em;
  padding: ${(props) => props.theme.baseSpacingSize / 3.333}px ${(props) => props.theme.baseSpacingSize}px;
  vertical-align: middle;
`;

export default function Badge(props = {
  type: 'default',
  noMargin: false,
  noBackground: false,
}) {
  const { theme } = useContext(ThemeContext);
  const color = { ...types[props.type] || types.default };

  if (props.noBackground) {
    color.textColor = color.border;
    color.background = 'transparent';
  }

  return <StyledBadge color={color} theme={theme} noMargin={props.noMargin} {...props}>
    {props.children}
  </StyledBadge>;
}
