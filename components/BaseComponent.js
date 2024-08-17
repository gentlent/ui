import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { breakpointWidth } from '../utils/themes/vars';

const StyledBase = styled.div`
  &.bc {
    ${(props) => (props.margin || props.margin === 0) && `
      margin: ${props.theme.baseSpacingSize * props.margin}px;
    `}

    ${(props) => (props.marginX || props.marginX === 0) && `
      margin-left: ${props.theme.baseSpacingSize * props.marginX}px;
      margin-right: ${props.theme.baseSpacingSize * props.marginX}px;
    `}

    ${(props) => (props.marginY || props.marginY === 0) && `
      margin-top: ${props.theme.baseSpacingSize * props.marginY}px;
      margin-bottom: ${props.theme.baseSpacingSize * props.marginY}px;
    `}

    ${(props) => (props.marginTop || props.marginTop === 0) && `
      margin-top: ${props.theme.baseSpacingSize * props.marginTop}px;
    `}

    ${(props) => (props.marginRight || props.marginRight === 0) && `
      margin-right: ${props.theme.baseSpacingSize * props.marginRight}px;
    `}

    ${(props) => (props.marginBottom || props.marginBottom === 0) && `
      margin-bottom: ${props.theme.baseSpacingSize * props.marginBottom}px;
    `}

    ${(props) => (props.marginLeft || props.marginLeft === 0) && `
      margin-left: ${props.theme.baseSpacingSize * props.marginLeft}px;
    `}

    ${(props) => (props.padding || props.padding === 0) && `
      padding: ${props.theme.baseSpacingSize * props.padding}px;
    `}

    ${(props) => (props.paddingX || props.paddingX === 0) && `
      padding-left: ${props.theme.baseSpacingSize * props.paddingX}px;
      padding-right: ${props.theme.baseSpacingSize * props.paddingX}px;
    `}

    ${(props) => (props.paddingY || props.paddingY === 0) && `
      padding-top: ${props.theme.baseSpacingSize * props.paddingY}px;
      padding-bottom: ${props.theme.baseSpacingSize * props.paddingY}px;
    `}

    ${(props) => (props.paddingTop || props.paddingTop === 0) && `
      padding-top: ${props.theme.baseSpacingSize * props.paddingTop}px;
    `}

    ${(props) => (props.paddingRight || props.paddingRight === 0) && `
      padding-right: ${props.theme.baseSpacingSize * props.paddingRight}px;
    `}

    ${(props) => (props.paddingBottom || props.paddingBottom === 0) && `
      padding-bottom: ${props.theme.baseSpacingSize * props.paddingBottom}px;
    `}

    ${(props) => (props.paddingLeft || props.paddingLeft === 0) && `
      padding-left: ${props.theme.baseSpacingSize * props.paddingLeft}px;
    `}

    ${(props) => props.float && `
      float: ${props.float};
    `}

    ${(props) => props.desktopOnly && `
      @media (max-width: ${breakpointWidth}px) {
        display: none;
      }
    `}

    ${(props) => props.mobileOnly && `
      @media (min-width: ${breakpointWidth}px) {
        display: none;
      }
    `}
  }
`;

export default function BaseComponent(functionProps) {
  const { theme } = useContext(ThemeContext);

  const classNames = `${functionProps.className || ''} bc`;

  return <StyledBase ref={functionProps.baseRef}
    theme={theme}
    as={functionProps?.elementType || 'div'}
    {...functionProps}
    className={classNames}>
    {functionProps.children}
  </StyledBase>;
}
