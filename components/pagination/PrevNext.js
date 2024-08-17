import styled from 'styled-components';
import { useContext } from 'react';
import BaseComponent from '../BaseComponent';
import Link from '../_base/Link';
import {
  colors, fontSize, getFontSize, lineHeight, transitions,
} from '../../utils/themes/vars';
import TextStyle from '../_base/TextStyles';
import { t } from '../../utils';
import { ThemeContext } from '../../context/theme.context';

const Pagination = styled(BaseComponent)`
  color: ${colors['blue-500']};
  display: flex;
  justify-content: ${(props) => (props.right ? 'flex-end' : 'flex-start')};
  text-align: ${(props) => (props.right ? 'right' : 'left')};
  transition: ${transitions.default} all .2s;

  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  padding: ${(props) => props.theme.baseSpacingSize}px ${(props) => props.theme.baseSpacingSize * 2}px;
  margin-${(props) => ((props.right) ? 'right' : 'left')}: 1.5em;

  ::${(props) => (props.right ? 'after' : 'before')} {
    ${(props) => (props.right ? 'right' : 'left')}: 0;

    content: "${(props) => (props.right ? '→' : '←')}";
    display: block;
    float: ${(props) => (props.right ? 'right' : 'left')};
    position: absolute;

    height: 100%;
    font-size: 1.5em;
    padding-top: ${(props) => getFontSize(props.theme, fontSize.small) * lineHeight.small}px;
    transition: ${transitions.default} all .2s;
  }

  :hover {
    background-color: ${colors['blue-50']};
  }

  :hover::${(props) => (props.right ? 'after' : 'before')} {
    transform: translateX(${(props) => (props.right ? '0.5em' : '-0.5em')});
  }
`;

export function PaginationPrevious(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <BaseComponent {...props} style={{ position: 'relative' }}>
      <Link href={props.href} block disabled={props.disabled} unstyled>
        <Pagination theme={theme}>
          <span>
            <TextStyle block small>{t('common.previous')}</TextStyle>
            {props.children}
          </span>
        </Pagination>
      </Link>
    </BaseComponent>
  );
}

export function PaginationNext(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <BaseComponent {...props}>
      <Link href={props.href} disabled={props.disabled} style={{ display: 'block' }} unstyled>
        <Pagination right theme={theme}>
          <span>
            <TextStyle block small>{t('common.nextUp')}</TextStyle>
            {props.children}
          </span>
        </Pagination>
      </Link>
    </BaseComponent>
  );
}
