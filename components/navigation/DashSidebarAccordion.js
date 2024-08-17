import styled from 'styled-components';
import {
  cloneElement,
  useCallback,
  useContext,
  useEffect, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import BaseComponent from '../BaseComponent';
import { transitions } from '../../utils/themes/vars';
import { StyledDashSidebarLink } from './DashNavigation';
import Icon from '../_base/Icon';
import { ThemeContext } from '../../context/theme.context';
import { GetTranslatedLink } from '../../utils';

const StyledContent = styled.div`
  transition: .1s ${transitions.default} all;
  overflow: auto;
  max-height: ${(props) => (props.initialOpen ? 'unset' : '0')};
`;

const StyledSummary = styled.div`
  position: relative;
`;

export default function DashSidebarAccordion(props) {
  const router = useRouter();
  const ref = useRef();
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(props.active);
  const [active, setActive] = useState(!!props.active);

  const { header, children } = props;

  const toggleOpened = useCallback(() => {
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
  }, [open]);

  useEffect(() => {
    // If isActive
    const handleRouteChange = (url) => {
      // Trim potential language prefix (/de-de/)
      const normalizedUrl = url.replace(/^\/[a-zA-Z]{2}-[a-zA-Z]{2}\//, '/');
      if (typeof props.active === 'undefined') {
        const shouldBeActive = GetTranslatedLink(normalizedUrl) === header.props.href;
        const shouldBeActiveOrOpen = shouldBeActive || normalizedUrl.startsWith(`${header.props.href}/`);
        setActive(shouldBeActive);
        if (shouldBeActiveOrOpen !== !!open && typeof open === 'undefined') {
          toggleOpened();
        }
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(router.asPath);

    // Transition itself
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
          router.events.off('routeChangeComplete', handleRouteChange);
        };
      }
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [open, router, header, toggleOpened, props]);

  return <BaseComponent {...props}>
    <StyledSummary data-summary>
      <StyledDashSidebarLink className="dashSidebarLink" theme={theme} active={active} {...header.props}
        style={{
          marginBottom: open ? theme.baseSpacingSize : undefined,
        }}
      >
        {header.props.icon && <Icon
          iconName={header.props.icon}
          iconFamily={active ? 'solid' : 'light'}
          iconColor={theme.sidebarTextColor}
          style={{ bottom: '0.05em' }}
          marginRight={1} />}
        {header.props.children}

        <Icon
          iconName="caret-down"
          iconFamily="solid"
          iconColor={theme.sidebarTextColor}
          style={{
            position: 'absolute',
            right: theme.baseSpacingSize * 4,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: '.1s all',
            transformOrigin: '50% 50%',
            ...(open && {
              transform: 'translateY(-50%) rotate(180deg)',
            }),
          }}
          onClick={(e) => {
            e.preventDefault();
            toggleOpened();
          }}
        />
      </StyledDashSidebarLink>
    </StyledSummary>
    <StyledContent data-content ref={ref} initialOpen={props.open}>
      {children.map((child) => cloneElement(child, {
        ...child.props,
        style: {
          ...child.props.style,
          paddingLeft: theme.baseSpacingSize * 7,
          marginBottom: theme.baseSpacingSize,
        },
      }))}
    </StyledContent>
  </BaseComponent>;
}
