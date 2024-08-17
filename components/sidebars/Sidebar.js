import {
  useState, useContext, useEffect,
} from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme.context';
import {
  breakpointWidth,
  fontSize,
  lineHeight,
  emphasize,
} from '../../utils/themes/vars';
import { t } from '../../utils';
import Accordion from '../accordion/Accordion';
import { DashSidebarLink } from '../navigation/DashNavigation';
import DashSidebarAccordion from '../navigation/DashSidebarAccordion';

function ConditionalAccordion(props) {
  if (props.isMobile) {
    return <Accordion unstyled {...props}>{props.children}</Accordion>;
  }

  return <>
    {props.header}
    {props.children}
  </>;
}

const StyledSidebar = styled.div`
  @media (min-width: ${({ settings }) => settings.sidebarBreakpoint}px) {
    background: ${({ theme }) => theme.backgroundColor};
    display: ${({ settings }) => (settings.isMobile ? 'none' : 'block')};
    position: sticky;
    float:left;
    top: ${({ settings, theme }) => (settings.supportSecondaryNavigation ? theme.baseSize * 2 : theme.baseSize)}px;
    z-index: 2;

    margin-left: calc(0px - ((100vw - ${({ settings }) => settings.containerMaxWidth}px) / 2));
    min-height: calc(100vh - ${({ settings, theme }) => (settings.supportSecondaryNavigation ? theme.baseSize * 2 : theme.baseSize)}px);

    border-right: 1px solid ${({ theme }) => theme.borderColor};
    margin-right: ${({ theme }) => theme.baseSpacingSize * 4}px;
    width: calc((100vw - ${({ settings, theme }) => settings.containerMaxWidth + theme.baseSpacingSize * 8 + 2}px) / 2);
    overflow-y: auto;
    padding: ${({ theme }) => theme.baseSpacingSize * 4}px 0;
  }
`;

const StyledSidebarLink = styled(DashSidebarLink)`
  margin-bottom: ${({ theme }) => theme.baseSpacingSize}px;
  margin-top: 0;
`;

const SidebarTitle = styled.p`
  padding: 0;
  margin: 0;

  ${({ isMobile, theme }) => !isMobile && `
    margin-bottom: ${theme.baseSpacingSize * 2}px;
  `}

  hyphens: auto;
  font-size: ${fontSize.normal}rem;
  line-height: ${lineHeight.normal}em;

  @media (min-width: ${({ settings }) => settings.sidebarBreakpoint}px) {
    padding: 0 ${({ theme }) => theme.baseSpacingSize * 4}px;
    opacity: ${emphasize.medium};
    margin-bottom: ${({ theme }) => theme.baseSpacingSize * 3}px !important;
  }
`;

export function SidebarLink(props) {
  const { theme } = useContext(ThemeContext);
  return <StyledSidebarLink theme={theme} {...props}>
    {props.level >= 2 && <>
      {Array.from({ length: props.level - 1 }).map(() => <>&middot;&middot;&middot;</>)}
      &nbsp;
    </>}
    {props.children}
  </StyledSidebarLink>;
}

export const SidebarAccordion = DashSidebarAccordion;

export default function Sidebar(props = {
  supportSecondaryNavigation: false,
}) {
  const [isMobile, setIsMobile] = useState(true);
  const { theme } = useContext(ThemeContext);

  const containerMaxWidth = breakpointWidth - theme.baseSpacingSize * 4 * 2;
  const sidebarMinWidth = theme.baseSize;
  const sidebarPadding = theme.baseSpacingSize * 12 + 1; // Plus 1px border
  const sidebarBreakpoint = breakpointWidth + (sidebarMinWidth + sidebarPadding) * 2;

  useEffect(() => {
    // Mobile View
    setIsMobile(window.innerWidth <= sidebarBreakpoint);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= sidebarBreakpoint);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsMobile, sidebarBreakpoint]);

  return <StyledSidebar settings={{
    supportSecondaryNavigation: props.supportSecondaryNavigation,
    sidebarBreakpoint,
    breakpointWidth,
    isMobile,
    containerMaxWidth,
  }} theme={theme}>
    <ConditionalAccordion isMobile={isMobile} header={<SidebarTitle isMobile={isMobile} settings={{ sidebarBreakpoint }} theme={theme}>{t('common.moreContent')}</SidebarTitle>}>
      {props.children}
    </ConditionalAccordion>
  </StyledSidebar>;
}
