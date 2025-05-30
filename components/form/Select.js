import styled from 'styled-components';
import { useContext } from 'react';
import Input from './Input';
import t from '../../utils/i18n';
import { ThemeContext } from '../../context/theme.context';
import { boxShadow, colors } from '../../utils/themes/vars';

const StyledSelect = styled(Input)`
  &, &::picker(select) {
    appearance: base-select;
  }

  &::picker(select) {
    border-radius: ${(props) => props.theme.baseBorderRadiusSmall}px;
    border: 1px solid ${colors['gray-200']};
    box-shadow: ${boxShadow.high};
    background-color: ${colors.white}ee;
    backdrop-filter: blur(10px);
  }
  
  & option {
    border-radius: ${(props) => props.theme.baseBorderRadiusSmall - (props.theme.baseSpacingSize * 0.25)}px;
    margin-left: ${(props) => props.theme.baseSpacingSize * 0.5}px;
    margin-right: ${(props) => props.theme.baseSpacingSize * 0.5}px;
    padding: ${(props) => props.theme.baseSpacingSize * 0.5}px ${(props) => props.theme.baseSpacingSize}px;
  }

  & option:hover {
    background-color: ${colors['gray-100']};
  }

  & option:first-child {
    margin-top: ${(props) => props.theme.baseSpacingSize * 0.5}px;
  }

  & option:last-child {
    margin-bottom: ${(props) => props.theme.baseSpacingSize * 0.5}px;
  }

  &::picker-icon {
    display: none;
  }

  font-weight: 400;
`;

export default function Select(props = {
  items: [],
}) {
  const { theme } = useContext(ThemeContext);
  const propsCopy = { ...props };
  const items = props.items || [{
    key: 'none',
    label: '-',
    disabled: true,
    selected: true,
  }];

  delete propsCopy.items;

  const hasDefault = items.some((item) => item.selected);

  return (
    <StyledSelect
      theme={theme}
      {...propsCopy}
      elementType="select">
      {!hasDefault && (<option disabled selected>
        {t('common.select')}
      </option>)}
      {items.map((item) => (
        <option
          theme={theme}
          key={item.key}
          value={item.key}
          disabled={item.disabled}
          selected={item.selected}>
          {item.label}</option>
      ))}
    </StyledSelect>
  );
}
