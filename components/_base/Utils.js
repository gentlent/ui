/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { breakpointWidth } from '../../utils/themes/vars';

const StyledFloatRight = styled.div`
  ${(props) => props.desktop && `
    @media (min-width: ${breakpointWidth}px) {
      float: right;
    }
  `}
  ${(props) => props.mobile && `
    @media (max-width: ${breakpointWidth}px) {
      float: right;
    }
  `}
`;

export function FloatRight(props) {
  const propsArray = {
    desktop: props.desktop || (!props.mobile && !props.desktop),
    mobile: props.mobile || (!props.mobile && !props.desktop),
  };
  return <StyledFloatRight {...propsArray}>
    {props.children}
  </StyledFloatRight>;
}

const StyledFloatLeft = styled.div`
  ${(props) => props.desktop && `
    @media (min-width: ${breakpointWidth}px) {
      float: left;
    }
  `}
  ${(props) => props.mobile && `
    @media (max-width: ${breakpointWidth}px) {
      float: left;
    }
  `}
`;

export function FloatLeft(props) {
  const propsArray = {
    desktop: props.desktop || (!props.mobile && !props.desktop),
    mobile: props.mobile || (!props.mobile && !props.desktop),
  };
  return <StyledFloatLeft {...propsArray}>
    {props.children}
  </StyledFloatLeft>;
}

export const Hidden = styled.span`
  display: none;
`;
