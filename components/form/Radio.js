import { useId, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme.context';
import {
  boxShadow, colors, emphasize, transitions,
} from '../../utils/themes/vars';
import BaseComponent from '../BaseComponent';

const StyledRadioContainer = styled(BaseComponent)`
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

const StyledRadio = styled.input`
  cursor: pointer;
  flex: 0 0 auto;
  appearance: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  border: 1px solid ${colors['gray-200']};
  border-radius: 50%;
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

  & + label {
      opacity: ${emphasize.medium};
  }

  &:checked {
    background-image: url(https://icons.gentcdn.com/solid/circle-dot?primary=ffffff);
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};

    & + label {
      opacity: 1;
    }
  }
`;

const StyledRadioLabel = styled.label`
  cursor: pointer;
  padding-left: ${({ theme }) => theme.baseSpacingSize * 2.5 - 2}px;
  transition: 0.1s ${transitions.default};
`;

export default function Radio(props) {
  const id = useId();
  const { theme } = useContext(ThemeContext);

  const propsCopy = { ...props };
  delete propsCopy.children;

  const parentProps = {};

  for (let i = 0; i < Object.keys(props).length; i += 1) {
    const key = Object.keys(props)[i];
    if (key.startsWith('margin') || key.startsWith('padding')) {
      parentProps[key] = props[key];
      delete propsCopy[key];
    }
  }

  return <StyledRadioContainer theme={theme} disabled={props.disabled} {...parentProps}>
    <StyledRadio
      theme={theme}
      {...propsCopy}
      id={props.id || id}
      type="radio" />
    <StyledRadioLabel theme={theme} disabled={props.disabled} for={props.id || id}>
      {props.children}
    </StyledRadioLabel>
  </StyledRadioContainer>;
}
