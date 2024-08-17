import styled from 'styled-components';
import { useContext } from 'react';
import { getFontSize, fontSize, breakpointWidth } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';

const ULElement = styled.ul`
  @media (min-width: ${breakpointWidth}px) {
    ${(props) => props.columns && `
      columns: ${props.columns};
    `}
  }

  padding-inline-start: ${(props) => props.theme.baseSpacingSize * 3}px;
  margin: ${(props) => props.theme.baseSpacingSize}px 0;

  li {
    list-style-type: disc;
  }
`;

const OLElement = styled.ol`
  @media (min-width: ${breakpointWidth}px) {
    ${(props) => props.columns && `
      columns: ${props.columns};
    `}
  }

  padding-inline-start: ${(props) => props.theme.baseSpacingSize * 3}px;
`;

const LIElement = styled.li`
  padding: 0 ${(props) => props.theme.baseSpacingSize * 1}px;
  margin-bottom: ${(props) => props.theme.baseSpacingSize * 1}px;

  ${(props) => (props.success || props.error) && `
    list-style-type: none !important;
    position: relative;

    &::before {
      content: "";
      display: block;
      height: ${getFontSize(props.theme, fontSize.normal)}px;
      width: ${getFontSize(props.theme, fontSize.normal)}px;
      position: absolute;
      left: ${-props.theme.baseSpacingSize * 2 - getFontSize(props.theme, fontSize.normal) / 4}px;
      top: ${props.theme.baseSpacingSize - getFontSize(props.theme, fontSize.normal) / 8}px;
      background: url(${props.success ? 'https://s1.gentcdn.com/images/icons/check-circle_solid.svg?primary=34d399' : 'https://s1.gentcdn.com/images/icons/times-circle_solid.svg?primary=f87171'}) no-repeat center center/contain;
    }
  `}

  ${(props) => props.arrow && `
    list-style-type: none !important;
    position: relative;

    &::before {
      content: "";
      display: block;
      height: ${getFontSize(props.theme, fontSize.normal)}px;
      width: ${getFontSize(props.theme, fontSize.normal)}px;
      position: absolute;
      left: ${-props.theme.baseSpacingSize * 2 - getFontSize(props.theme, fontSize.normal) / 4}px;
      top: ${props.theme.baseSpacingSize - getFontSize(props.theme, fontSize.normal) / 8}px;
      background: url(https://s1.gentcdn.com/images/icons/circle-arrow-right_solid.svg?primary=9ca3af) no-repeat center center/contain;
    }
  `};
`;

export function UL(props) {
  const { theme } = useContext(ThemeContext);
  return <ULElement theme={theme} {...props}>
    {props.children}
  </ULElement>;
}

export function OL(props) {
  const { theme } = useContext(ThemeContext);
  return <OLElement theme={theme} {...props}>
    {props.children}
  </OLElement>;
}

export function LI(props) {
  const { theme } = useContext(ThemeContext);
  return <LIElement theme={theme} {...props}>
    {props.children}
  </LIElement>;
}
