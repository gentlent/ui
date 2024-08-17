import styled from 'styled-components';
import { useContext } from 'react';
import { breakpointWidth } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';

export const GridElement = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  ${({ flex }) => (flex ? `
    justify-content: space-around;
  ` : `
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  `)}
  
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: 0;

  ${(props) => props.alternated && `
    @media (min-width: ${breakpointWidth}px) {
      transform: scaleX(-1);
    }

    & > div {
      @media (min-width: ${breakpointWidth}px) {
      transform: scaleX(-1);
    }
    }
  `}

  ${(props) => props.spaced && `
    margin-left: ${-props.theme.baseSpacingSize}px;
    margin-right: ${-props.theme.baseSpacingSize}px;
    margin-bottom: ${-props.theme.baseSpacingSize * 2}px;
    width: calc(100% + ${props.theme.baseSpacingSize * 2}px);
    max-width: calc(100% + ${props.theme.baseSpacingSize * 2}px);

    & > div {
      padding: 0 ${props.theme.baseSpacingSize}px;
      margin: 0 0 ${props.theme.baseSpacingSize * 2}px;
    }
  `}
`;

export const ColumnElement = styled.div`
  box-sizing: border-box;
  float: left;

  @media (max-width: ${breakpointWidth}px) {
    &:not(:has(*)) {
      display: none;  
    }
  }

  ${({ size, desktopSize, mobileSize }) => (!size && !desktopSize && !mobileSize) && `
    align-items: center;
    display: flex;
    justify-content: center;
  `}
  
  ${(props) => props.size && `
    width: ${100 / (12 / props.size)}%;

    @media (max-width: ${breakpointWidth}px) {
      width: ${props.size < 3 ? 50 : 100}%;
    }
  `}

  ${(props) => props.desktopSize && `
    @media (min-width: ${breakpointWidth}px) {
      width: ${100 / (12 / props.desktopSize)}%;
    }
  `}

  ${(props) => props.mobileSize && `
    @media (max-width: ${breakpointWidth}px) {
      width: ${100 / (12 / props.mobileSize)}%;
    }
  `}
`;

export function Grid(props = {}) {
  const { theme } = useContext(ThemeContext);
  return <GridElement theme={theme} {...props}>{props.children || <>&nbsp;</>}</GridElement>;
}

export function Column(props = {}) {
  const { theme } = useContext(ThemeContext);
  return <ColumnElement theme={theme} {...props}>{props.children || <>&nbsp;</>}</ColumnElement>;
}
