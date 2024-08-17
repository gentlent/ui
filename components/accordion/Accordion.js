import styled from 'styled-components';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';
import { fontWeight, transitions } from '../../utils/themes/vars';
import Icon from '../_base/Icon';

const StyledIcon = styled(Icon)`
  float: right;
  bottom: 0;
  right: 0;
  transform: translateY(50%);
  transition: .1s ${transitions.default} all;
  padding-left: ${(props) => props.theme.baseSpacingSize * 2}px;
  padding-bottom: ${(props) => props.theme.baseSpacingSize * 2}px;
`;

const StyledContent = styled.div`
  transition: .1s ${transitions.default} all;
  list-style: none;
  
  ${(props) => (!props.unstyled && `
    padding: ${props.theme.baseSpacingSize * 2}px ${props.theme.baseSpacingSize * 4}px ${props.theme.baseSpacingSize * 4}px;
  `)};
  
  overflow: auto;
  max-height: ${(props) => (props.initialOpen ? 'unset' : '0')};
  padding-top: 0;
  padding-bottom: 0;
`;

const StyledDetails = styled.div`
  ${(props) => (props.unstyled ? `
  ` : `
    background: ${props.theme.secondaryBackgroundColor};
    border-radius: ${props.theme.baseBorderRadius}px;
    overflow: hidden;
    margin-bottom: ${props.noMargin ? 0 : props.theme.baseSpacingSize * 2}px;
  `)};

  &.open > [data-summary] > [data-icon] {
    transform: translateY(50%) rotate(180deg);
  }
`;

const StyledDetailsInner = styled.div`
  padding-bottom: ${(props) => props.theme.baseSpacingSize * 2}px;
`;

const StyledSummary = styled.div`
  padding: ${(props) => props.theme.baseSpacingSize * 3}px ${(props) => props.theme.baseSpacingSize * 0}px;
  font-weight: ${fontWeight.medium};
  position: relative;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;

  ${(props) => (!props.unstyled && `
    padding: ${props.theme.baseSpacingSize * 2}px ${props.theme.baseSpacingSize * 4}px;
  `)};
`;

export default function Accordion(props) {
  const [open, setOpen] = useState(props.open || false);
  const ref = useRef();

  const { theme } = useContext(ThemeContext);
  const { header } = props;
  const { children } = props;

  useEffect(() => {
    const contentElement = ref.current;

    const removeMaxHeight = () => {
      if (contentElement) {
        contentElement.style.maxHeight = 'unset';
      }
    };

    if (contentElement) {
      if (open) {
        contentElement.addEventListener('transitionend', removeMaxHeight, { once: true });
        return () => {
          contentElement.removeEventListener('transitionend', removeMaxHeight);
        };
      }
    }

    return () => { };
  }, [open]);

  function toggleOpened() {
    if (ref.current) {
      if (!open) {
        const { scrollHeight } = ref.current;
        ref.current.style.maxHeight = `${scrollHeight}px`;
      } else {
        const { scrollHeight } = ref.current;
        ref.current.style.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          ref.current.style.maxHeight = '0';
        }, 1);
      }
      setOpen(!open);
    }
  }

  return <BaseComponent {...props}>
    <StyledDetails theme={theme} className={open ? 'open' : undefined} noMargin={props.noMargin} unstyled={props.unstyled}>
      <StyledSummary theme={theme} data-summary unstyled={props.unstyled} onClick={() => {
        toggleOpened();
      }}>
        {header}
        <StyledIcon data-icon iconColor={props.iconColor} iconName="chevron-down" />
      </StyledSummary>
      <StyledContent data-content
        ref={ref}
        theme={theme}
        unstyled={props.unstyled}
        initialOpen={props.open}>
        <StyledDetailsInner theme={theme}>
          {children}
        </StyledDetailsInner>
      </StyledContent>
    </StyledDetails>
  </BaseComponent>;
}
