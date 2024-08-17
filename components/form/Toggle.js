// Toggle Checkbox
import styled from 'styled-components';
import React, { useContext } from 'react';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';
import {
  colors, transitions, boxShadow, emphasize,
} from '../../utils/themes/vars';

const StyledCheckbox = styled.input`
  visibility: hidden;
  pointer-events: none;
`;

const StyledBubble = styled.span`
  display: inline-block;
  float: left;
  background: ${colors.white};
  border-radius: 50%;
  box-shadow: ${boxShadow.default};
  height: ${({ theme }) => theme.baseSize / 4}px;
  width: ${({ theme }) => theme.baseSize / 4}px;

  @keyframes checked-bubble-${({ checked }) => !!checked} {
    0% {
      transform: scale(1.25) translateX(${({ theme, checked }) => (checked ? 0 : theme.baseSize / 4)}px);
    }
    100% {
      transform: scale(1.25) translateX(${({ theme, checked }) => (checked ? theme.baseSize / 4 : 0)}px);
    }
  }

  animation: checked-bubble-${({ checked }) => !!checked} .2s ${transitions.default} forwards;
  transform: scale(1.25) translateX(${({ theme, checked }) => (checked ? theme.baseSize / 4 : 0)}px);

  ${({ loading }) => loading && `
    background-image: url(https://icons.gentcdn.com/loading);
    background-size: 75%;
    background-position: center;
    background-repeat: no-repeat;
  `};
`;

const StyledToggle = styled(BaseComponent)`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.baseSize / 8 + theme.baseSpacingSize / 2}px;
  display: inline-block;
  padding: ${({ theme }) => theme.baseSpacingSize / 2}px;
  height: ${({ theme }) => theme.baseSize / 4 + theme.baseSpacingSize}px;
  width: ${({ theme }) => (theme.baseSize / 2 + theme.baseSpacingSize * 1.5)}px;
  transition: all 2s ${transitions.default};

  @keyframes checked-toggle-${({ checked }) => !!checked} {
    0% {
      background: ${({ checked, theme }) => (checked ? colors['gray-200'] : theme.primary)};
    }
    100% {
      background: ${({ checked, theme }) => (checked ? theme.primary : colors['gray-200'])};
    }
  }

  animation: checked-toggle-${({ checked }) => !!checked} .1s ${transitions.default} forwards;
  background: ${({ checked, theme }) => (checked ? theme.primary : colors['gray-200'])};

  ${({ disabled }) => disabled && `
    cursor: not-allowed;
    opacity: ${1 - emphasize.disabled};
  `}
`;

export default function Toggle(props = {}) {
  const { theme } = useContext(ThemeContext);
  const [checked, setChecked] = React.useState(props.checked || props.defaultChecked || false);

  const {
    name, value, onChange, defaultChecked, loading,
  } = props;

  const disabled = props.disabled || loading;

  const propsCopy = { ...props };
  delete propsCopy.name;
  delete propsCopy.value;
  delete propsCopy.onChange;
  delete propsCopy.checked;
  delete propsCopy.defaultChecked;

  const onClick = async () => {
    if (!disabled) {
      let changeOnClick = true;
      if (onChange) {
        const onChangeFn = onChange(!checked);

        // check if promise
        if (onChangeFn.then) {
          changeOnClick = (await onChangeFn) !== false;
        } else {
          changeOnClick = onChangeFn !== false;
        }
      }

      if (changeOnClick) {
        setChecked(!checked);
      }
    }
  };

  return <>
    <StyledToggle
      theme={theme}
      disabled={disabled}
      marginY={2}
      {...propsCopy}
      checked={checked}
      defaultChecked={defaultChecked}
      onClick={onClick}
    >
      <StyledBubble
        loading={loading}
        theme={theme}
        disabled={disabled}
        checked={checked}
      />
    </StyledToggle>
    <StyledCheckbox
      type="checkbox"
      name={name}
      value={value}
      defaultChecked={checked}
      disabled={disabled}
    />
  </>;
}
