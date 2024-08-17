import styled from 'styled-components';
import { useContext } from 'react';
import Container from '../container/Container';
import {
  fontSize, getFontSize,
} from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';
import Icon from '../_base/Icon';
import BaseComponent from '../BaseComponent';
import { types } from '../alert/Alert';

const StyledBanner = styled(BaseComponent)`
  background: ${(props) => props.color.background};
  color: ${(props) => props.color.textColor};
  padding: ${(props) => props.theme.baseSpacingSize * 1.5}px ${(props) => props.theme.baseSpacingSize * 2}px;
  font-size: ${(props) => getFontSize(props.theme, fontSize.small)}px;
  line-height: ${(props) => props.theme.baseLineHeight}em;
`;

const StyledBannerInner = styled(BaseComponent)`
  display: flex;
  align-items: stretch;
`;

export default function Banner(props = {
  type: 'default',
  icon: null,
}) {
  const { theme } = useContext(ThemeContext);
  const color = types[props.type] || types.default;
  const icon = props.icon ? props.icon : color.defaultIcon;

  const styles = { ...props.style };

  return <StyledBanner theme={theme} color={color} {...props} style={styles}>
    <Container>
      <StyledBannerInner>
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
      </StyledBannerInner>
    </Container>
  </StyledBanner>;
}
