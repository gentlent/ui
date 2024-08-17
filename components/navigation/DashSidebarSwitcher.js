import { useContext } from 'react';
import styled from 'styled-components';
import { colors, fontSize, getFontSize } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';
import Link from '../_base/Link';

const SwitcherWrapper = styled.div`
  margin: ${({ theme }) => -theme.baseSpacingSize * 2}px 0;
`;

const SwitcherLink = styled(Link)`
  display: block;
  font-size: ${({ theme }) => getFontSize(theme, fontSize.small)}px;
  padding: ${({ theme }) => theme.baseSpacingSize * 0.5}px ${({ theme }) => theme.baseSpacingSize * 2}px;

  background: url(https://icons.gentcdn.com/solid/arrows-cross?primary=${colors['gray-400'].substr(1)}) no-repeat right ${({ theme }) => theme.baseSpacingSize * 2}px center/${fontSize.small}em auto;
  background-color: ${colors['gray-100']};

  &:hover {
    background-image: url(https://icons.gentcdn.com/solid/arrows-cross?primary=${colors['gray-800'].substr(1)});
  }
`;

export default function DashSidebarSwitcher(props) {
  const { theme } = useContext(ThemeContext);
  return <SwitcherWrapper theme={theme}>
    <SwitcherLink theme={theme} unstyled href={props.href}>{props.children}</SwitcherLink>
  </SwitcherWrapper>;
}
