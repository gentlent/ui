import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme.context';

import {
  colors, transitions, emphasize, boxShadow, convertColorHexToRgb, breakpointWidth,
} from '../../utils/themes/vars';

export const types = {
  primary: {},
  default: {
    primary: colors['gray-600'],
    secondary: colors.white,
  },
  info: {
    primary: colors['blue-600'],
    secondary: colors.white,
  },
  success: {
    primary: colors['green-600'],
    secondary: colors.white,
  },
  warning: {
    primary: colors['yellow-500'],
    secondary: colors.white,
  },
  error: {
    primary: colors['red-600'],
    secondary: colors.white,
  },
  inverted: {
    primary: colors.white,
    secondary: colors['gray-600'],
  },
};

const StyledButton = styled.button`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  border: 0px solid;
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  box-shadow: ${boxShadow.light};
  cursor: pointer;
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  ${(props) => (props.block && 'width: 100%;')}
  font-weight: 500;
  line-height: ${(props) => props.theme.baseLineHeight};
  padding: ${(props) => props.theme.baseSpacingSize * 1.25}px ${(props) => props.theme.baseSpacingSize * 2}px;
  margin-top: ${(props) => (props.noMargin ? '0' : props.theme.baseSpacingSize / 2)}px;
  margin-bottom: ${(props) => (props.noMargin ? '0' : props.theme.baseSpacingSize / 2)}px;
  vertical-align: middle;
  transition: .05s all ${transitions.default};
  opacity: 1;
  user-select: none;
  text-decoration: none !important;

  &:first-child {
    margin-inline-start: 0;
  }

  &:focus {
    outline: none;
  }

  ${(props) => props.blockOnMobile && `
    @media (max-width: ${breakpointWidth}px) {
      display: block;
      width: 100%;
    }
  `}

  ${(props) => {
    if (props.buttonStyle === 'outline') {
      return `
        border: 1px solid rgba(${convertColorHexToRgb(props.color.primary)}, ${emphasize.disabled});
        color: ${props.color.primary};
        background: none;

        ${props.dotted && `
          border-style: dashed;
        `}

        &:hover, &:focus {
          border: 1px solid rgba(${convertColorHexToRgb(props.color.primary)}, 1);
          ${props.dotted && `
            border-style: dashed;
          `}
        }

        &:active {
          background: rgba(${convertColorHexToRgb(props.color.primary)}, ${emphasize.light});
        }
      `;
    } if (props.buttonStyle === 'flat') {
      return `
        color: ${props.color.primary};
        background: none;
        box-shadow: none;

        &:active {
          background: rgba(${convertColorHexToRgb(props.color.primary)}, ${emphasize.light * 2});
        }

        &:focus:not(:active) {
          background: rgba(${convertColorHexToRgb(props.color.primary)}, ${emphasize.light});
        }
      `;
    }

    return `
      background-color: ${props.color.primary};
      color: ${props.color.secondary};

      &:active {
        opacity: ${emphasize.high};
      }

      &:focus {
        box-shadow: ${boxShadow.default};
      }
    `;
  }}

  ${({ loading, buttonStyle }) => loading && `
    color: transparent;
    background-image: url(https://icons.gentcdn.com/loading${buttonStyle ? '' : '_white'}.svg);
    background-size: 50% 50%;
    background-repeat: no-repeat;
    background-position: center center;
    & > * {
      opacity: 0;
    }
  `}

  ${({ disabled }) => disabled && `
    opacity: ${emphasize.disabled} !important;
    pointer-events: none;
  `}
`;

export default function Button(props = {
  buttonType: 'primary',
  noMargin: false,
  block: false,
  buttonStyle: null,
  loading: null,
  dotted: null,
}) {
  const { theme } = useContext(ThemeContext);

  const buttonType = props.buttonType || props.type;

  const buttonTypes = {
    ...types,
    primary: {
      primary: theme.primary,
      secondary: colors.white,
    },
  };

  const color = buttonTypes[buttonType] || buttonTypes.primary;

  const isDisabled = props.loading || props.disabled;

  const propsCopy = { ...props };
  delete propsCopy.disabled;

  return <StyledButton disabled={isDisabled} color={color} theme={theme}
    buttonStyle={props.buttonStyle} noMargin={props.noMargin} block={props.block}
    blockOnMobile={props.blockOnMobile} {...propsCopy}>
    {props.children}
  </StyledButton>;
}
