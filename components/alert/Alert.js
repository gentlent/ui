import styled from 'styled-components';
import { useContext } from 'react';
import {
  boxShadow, colors, fontSize, getFontSize,
} from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';
import Icon from '../_base/Icon';
import BaseComponent from '../BaseComponent';

export const types = {
  default: {
    background: 'transparent',
    border: colors['gray-300'],
    textColor: colors['gray-600'],
    defaultIcon: 'circle-info',
    boxShadow: boxShadow.light,
  },
  info: {
    background: colors['blue-50'],
    border: colors['blue-300'],
    textColor: colors['blue-600'],
    defaultIcon: 'circle-question',
    boxShadow: boxShadow.light,
  },
  success: {
    background: colors['green-50'],
    border: colors['green-300'],
    textColor: colors['green-600'],
    defaultIcon: 'circle-check',
    boxShadow: boxShadow.light,
  },
  warning: {
    background: colors['yellow-50'],
    border: colors['yellow-300'],
    textColor: colors['yellow-600'],
    defaultIcon: 'triangle-exclamation',
    boxShadow: boxShadow.light,
  },
  error: {
    background: colors['red-50'],
    border: colors['red-300'],
    textColor: colors['red-600'],
    defaultIcon: 'circle-exclamation',
    boxShadow: boxShadow.light,
  },
  blank: {
    background: 'transparent',
    border: 'transparent',
    textColor: colors['gray-600'],
    defaultIcon: 'circle-info',
    boxShadow: 'none',
  },
};

const StyledAlert = styled(BaseComponent)`
  background: ${(props) => props.color.background};
  box-shadow: ${(props) => props.color.boxShadow};
  border: 1px solid ${(props) => props.color.border};
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  color: ${(props) => props.color.textColor};
  padding: ${(props) => props.theme.baseSpacingSize * 1.5}px ${(props) => props.theme.baseSpacingSize * 2}px;
  ${(props) => props.marginY === undefined && `
    margin: ${props.theme.baseSpacingSize}px 0;
  `}
  font-size: ${(props) => getFontSize(props.theme, fontSize.small)}px;
  line-height: ${(props) => props.theme.baseLineHeight}em;

  display: flex;
  align-items: stretch;
`;

export default function Alert(props = {
  type: 'default',
  icon: null,
}) {
  const { theme } = useContext(ThemeContext);
  const color = types[props.type] || types.default;
  const icon = props.icon ? props.icon : color.defaultIcon;

  const styles = { ...props.style };

  if (props.type === 'blank' && props.noPaddingTop) {
    styles.paddingTop = '0px';
  }

  return <StyledAlert theme={theme} color={color} {...props} style={styles}>
    {icon && <Icon
      style={{
        height: 'auto',
        bottom: '0',
        minWidth: '16px',
        maxHeight: `${theme.baseLineHeight * 2}em`,
      }}
      float={'left'}
      marginRight={1}
      iconName={icon}
      iconSize={2}
      iconColor={color.textColor} />}
    <BaseComponent>
      {props.children}
    </BaseComponent>
  </StyledAlert>;
}
