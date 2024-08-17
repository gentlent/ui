import styled from 'styled-components';
import {
  cloneElement,
  createRef, useContext, useEffect,
  Children,
} from 'react';
import { Grid } from './Grid';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';
import { breakpointWidth } from '../../utils/themes/vars';

const StyledWrapper = styled(BaseComponent)`
  position: relative;

  /* Overflow */
  &::before, &::after {
    content: '';
    display: block;
    pointer-events: none;
    z-index: 5;

    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(50vw - ${(props) => (breakpointWidth / 2) - props.theme.baseSpacingSize * 4}px);

    @media (max-width: ${breakpointWidth}px) {
      width: ${(props) => props.theme.baseSpacingSize * 4}px;
    }
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${(props) => props.theme.backgroundColor}, transparent);
    @media (max-width: ${breakpointWidth}px) {
      background: none;
    }
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${(props) => props.theme.backgroundColor}, transparent);
    @media (max-width: ${breakpointWidth}px) {
      background: none;
    }
  }

  /* Fake Overflow */
  margin: 0 calc(-50vw + ${(props) => (breakpointWidth / 2) - props.theme.baseSpacingSize * 4}px);

  @media (max-width: ${breakpointWidth}px) {
    margin: 0 ${(props) => -props.theme.baseSpacingSize * 4}px;
  }
`;

const StyledContainer = styled(BaseComponent)`
  cursor: grab;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
  scroll-snap-type: x mandatory;

  /* Hide Scrollbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
    width: 0 !important
  }
`;

const StyledHorizontalScroller = styled(Grid)`
  flex-flow: row nowrap;
  width: unset;
  max-width: unset;

  & a, & img {

    user-select: none;
    -webkit-user-drag: none;
  }

  & > div {
    scroll-snap-align: start;
    scroll-margin: calc(50vw - ${(props) => (breakpointWidth / 2) - props.theme.baseSpacingSize * 4}px);
    flex-shrink: 0;

    @media (max-width: ${breakpointWidth}px) {
      width: calc(100% - ${(props) => props.theme.baseSpacingSize * 8}px) !important;
      scroll-margin: ${(props) => props.theme.baseSpacingSize * (4 - 1)}px;
    }
    
    &:first-child {
      margin-left: calc(50vw - ${(props) => (breakpointWidth / 2) - props.theme.baseSpacingSize * 4}px);

      @media (max-width: ${breakpointWidth}px) {
        margin-left: ${(props) => props.theme.baseSpacingSize * 4}px;
      }
    }

    &:last-child {
      margin-right: calc(50vw - ${(props) => (breakpointWidth / 2) - props.theme.baseSpacingSize * 4}px);

      @media (max-width: ${breakpointWidth}px) {
        margin-right: ${(props) => props.theme.baseSpacingSize * 4}px;
      }
    }
  }

  &::after {
    content: '';
    display: block;
    width: 1px;
    margin-left: -${(props) => props.theme.baseSpacingSize + 1}px;
    height: 1px;
    flex-shrink: 0;
  }
`;

export default function HorizontalScroller(props) {
  const ref = createRef();
  const { theme } = useContext(ThemeContext);

  // Grab-Scrolling
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return () => { };

    let pos = {
      left: 0, x: 0,
    };

    const onMouseMove = (e) => {
      const dx = e.clientX - pos.x;

      const maxScrollLeft = currentRef.scrollWidth - currentRef.clientWidth;
      if (maxScrollLeft > pos.left - dx) {
        currentRef.scrollLeft = pos.left - dx;
      }
      currentRef.classList.add('disableChildPointerEvents');
    };

    const onMouseUp = (e) => {
      e.preventDefault();

      currentRef.classList.remove('disableChildPointerEvents');
      currentRef.removeEventListener('mousemove', onMouseMove);
      currentRef.removeEventListener('mouseup', onMouseUp);

      currentRef.style.cursor = 'grab';
      currentRef.style.removeProperty('user-select');
    };

    const onMouseDown = (e) => {
      pos = {
        left: currentRef.scrollLeft,
        x: e.clientX,
      };

      currentRef.style.cursor = 'grabbing';
      currentRef.style.userSelect = 'none';

      currentRef.addEventListener('mousemove', onMouseMove);
      currentRef.addEventListener('mouseup', onMouseUp);
    };

    currentRef.addEventListener('mousedown', onMouseDown);

    return () => {
      currentRef.removeEventListener('mousedown', onMouseDown);
      currentRef.removeEventListener('mousemove', onMouseMove);
      currentRef.removeEventListener('mouseup', onMouseUp);
    };
  });

  // Shadows (commented out)
  /* useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;

      if (scrollLeft <= 0 && scrollWidth > clientWidth) {
        ref.current.style.boxShadow = `rgba(0, 0, 0, 0) 12px 0px 8px -8px inset,
        rgba(0, 0, 0, ${emphasize.disabled / 2}) -12px 0px 8px -8px inset`;
      } else if (scrollLeft <= 0 && scrollWidth <= clientWidth) {
        ref.current.style.boxShadow = null;
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        ref.current.style.boxShadow = `rgba(0, 0, 0, ${emphasize.disabled / 2})
        12px 0px 8px -8px inset, rgba(0, 0, 0, 0) -12px 0px 8px -8px inset`;
      } else {
        ref.current.style.boxShadow = `rgba(0, 0, 0, ${emphasize.disabled / 2})
        12px 0px 8px -8px inset, rgba(0, 0, 0, ${emphasize.disabled / 2}) -12px 0px 8px -8px inset`;
      }
    };

    if (!ref.current.style?.boxShadow) {
      handleScroll();
    }

    const refCurrent = ref.current;
    refCurrent?.addEventListener('scroll', handleScroll);
    return () => refCurrent?.removeEventListener('scroll', handleScroll);
  }, [ref]); */

  return <StyledWrapper theme={theme} {...props}>
    <StyledContainer theme={theme} baseRef={ref}>
      <StyledHorizontalScroller theme={theme} {...props}>
        {Children.toArray(props.children).map((item, i, array) => {
          let columnsVisible = 0;
          let spaceUsed = 0;
          for (let j = 0; j < array.length; j += 1) {
            spaceUsed += array[j].props.size;
            if (spaceUsed > 12) {
              break;
            }

            columnsVisible += 1;
          }

          const padding = ((theme.baseSpacingSize * 2) / columnsVisible) * (columnsVisible - 1);

          return cloneElement(item, {
            ...item.props,
            style: {
              ...item.props.style,
              width: `${(item.props.size / 12) * breakpointWidth - padding}px`,
            },
          });
        })}
      </StyledHorizontalScroller>
    </StyledContainer>
  </StyledWrapper>;
}
