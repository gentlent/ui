import { useId, useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme.context';
import {
  boxShadow, colors, emphasize, transitions,
} from '../../utils/themes/vars';
import BaseComponent from '../BaseComponent';

const StyledCheckboxContainer = styled(BaseComponent)`
  display: flex;
  align-items: flex-start;

  ${({ noMargin, theme }) => !noMargin && `
    margin: ${theme.baseSpacingSize}px 0;
  `}

  ${({ disabled }) => disabled && `
    pointer-events: none;
    opacity: ${emphasize.disabled};
  `};
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  flex: 0 0 auto;
  appearance: none;
  background-repeat: no-repeat;
  background-position: 66% center;
  background-size: 61.8%;
  border: 1px solid ${colors['gray-200']};
  border-radius: ${({ theme }) => theme.baseBorderRadiusSmall}px;
  box-shadow: ${boxShadow.light};
  height: 1.25em;
  width: 1.25em;
  transition: 0.1s ${transitions.default};

  ${({ disabled }) => disabled && `
    background-color: ${colors['gray-100']};

    &:checked {
      opacity: ${emphasize.disabled};
    }
  `};

  margin:
    ${({ theme }) => (theme.baseLineHeight - 1.25) / 2 + 0.1}em 0
    0 0;

  &:checked {
    background-image: url(https://icons.gentcdn.com/solid/check?primary=ffffff);
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};

    & + label {
      opacity: ${emphasize.medium};
    }
  }
`;

const StyledCheckboxLabel = styled.label`
  cursor: pointer;
  padding-left: ${({ theme }) => theme.baseSpacingSize * 2.5 - 2}px;
  transition: 0.1s ${transitions.default};
`;

export default function Checkbox(props) {
  const id = useId();
  const { theme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(props.checked || false);

  const propsCopy = { ...props };
  propsCopy.checked = checked;
  delete propsCopy.children;

  const parentProps = {};

  for (let i = 0; i < Object.keys(props).length; i += 1) {
    const key = Object.keys(props)[i];
    if (key.startsWith('margin') || key.startsWith('padding')) {
      parentProps[key] = props[key];
      delete propsCopy[key];
    }
  }

  return <StyledCheckboxContainer theme={theme} disabled={props.disabled} {...parentProps}>
    <StyledCheckbox
      theme={theme}
      {...propsCopy}
      id={props.id || id}
      type="checkbox"
      onChange={(e) => {
        setChecked(e.target.checked);
        if (props.onChange) {
          props.onChange(e);
        }
      }} />
    <StyledCheckboxLabel theme={theme} disabled={props.disabled} for={props.id || id}>
      {props.children}
    </StyledCheckboxLabel>
  </StyledCheckboxContainer>;
}
