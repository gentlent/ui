import styled from 'styled-components';
import {
  useEffect, useRef, useState,
} from 'react';
import BaseComponent from '../BaseComponent';
import { transitions } from '../../utils/themes/vars';

const StyledContent = styled.div`
  transition: .1s ${transitions.default} all;
  overflow: auto;
  max-height: ${(props) => (props.initialOpen ? 'unset' : '0')};
`;

const StyledSummary = styled.div`
  position: relative;
`;

export default function Accordion(props) {
  const [open, setOpen] = useState(props.open || false);
  const ref = useRef();

  const { header } = props;
  const { children } = props;
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
      props.callback?.(!open, toggleOpened);
      setOpen(!open);
    }
  }

  props.callback?.(open, toggleOpened);
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
  }, [open, props]);

  return <BaseComponent {...props}>
    <StyledSummary data-summary onClick={() => {
      toggleOpened();
    }}>
      {header}
    </StyledSummary>
    <StyledContent data-content ref={ref} initialOpen={props.open}>
      {children}
    </StyledContent>
  </BaseComponent>;
}
