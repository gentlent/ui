import {
  useState, useContext, useEffect, createRef,
} from 'react';
import styled from 'styled-components';
import Container from '../container/Container';
import { ThemeContext } from '../../context/theme.context';
import {
  breakpointWidth,
  fontSize,
  lineHeight,
  fontWeight,
  colors,
} from '../../utils/themes/vars';
import { t } from '../../utils';
import CustomLink from '../_base/Link';
import Icon, { Loading } from '../_base/Icon';
import Accordion from '../accordion/Accordion';

function ConditionalContainer(props) {
  if (props.show) {
    return <Container {...props}>{props.children}</Container>;
  }

  return <>{props.children}</>;
}

function ConditionalAccordion(props) {
  if (props.isMobile) {
    return <Accordion {...props}>{props.children}</Accordion>;
  }

  return <>
    {props.header}
    {props.children}
  </>;
}

const InnerStyledContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.baseSize}px;
`;

const StyledToC = styled.div`
  @media (min-width: ${({ settings }) => settings.sidebarBreakpoint}px) {
    display: ${({ settings }) => (settings.isMobile ? 'none' : 'block')};
    position: sticky;
    float: right;
    top: ${({ settings, theme }) => (settings.supportSecondaryNavigation ? theme.baseSize * 2 : theme.baseSize)}px;
    bottom: 0;

    max-height: calc(100vh - ${({ settings, theme }) => (settings.supportSecondaryNavigation ? theme.baseSize * 2 : theme.baseSize)}px);

    // border-left: 1px solid ${({ theme }) => theme.borderColor};
    padding: ${({ theme }) => theme.baseSpacingSize * 4}px;
    // margin-left: ${({ theme }) => theme.baseSpacingSize * 4}px;
    margin-right: ${({ theme }) => theme.baseSpacingSize * 4}px;
    width: calc((100% - ${({ settings, theme }) => settings.containerMaxWidth + theme.baseSpacingSize * 8 + 2}px) / 2);
    overflow-y: auto;
  }

  padding: ${({ theme }) => theme.baseSpacingSize * 4}px 0;
`;

const ToCLink = styled(CustomLink)`
  border-radius: ${(props) => props.theme.baseSpacingSize * 4}px;
  display: block;
  padding: ${(props) => props.theme.baseSpacingSize * 0.5}px 0;
  color: currentColor;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.active {
    opacity: 1;
  }
`;

const ToCTitle = styled.p`
  padding: 0;
  margin: 0;

  ${({ isMobile, theme }) => !isMobile && `
    margin-bottom: ${theme.baseSpacingSize * 2}px;
  `}

  hyphens: auto;

  font-size: ${fontSize.normal}rem;
  line-height: ${lineHeight.normal}em;
  font-weight: ${fontWeight.semibold};
`;

export default function TableOfContents(props = {
  supportSecondaryNavigation: false,
}) {
  const [headings, setHeadings] = useState(null);
  const [isMobile, setIsMobile] = useState(true);
  const { theme } = useContext(ThemeContext);
  const tocContentRef = createRef(null);

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

    if (!headings) {
      const headingsArray = [];
      const hs = tocContentRef.current.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]');
      for (let i = 0; i < hs.length; i += 1) {
        const h = hs[i];
        headingsArray.push({
          h: h.tagName.match(/\d+/)[0],
          id: h.id,
          text: h.innerText,
        });
      }
      setHeadings(headingsArray);
    }

    // Handle scrolling links active, match with headings
    const handleScroll = () => {
      if (!headings || headings?.length === 0) return;

      const scrollPosition = window.scrollY;
      const getAllHeadingYPositions = headings.map((heading) => {
        const headingElement = document.getElementById(heading.id);
        if (!headingElement) return null;
        const { top } = headingElement.getBoundingClientRect();
        return { pos: top + scrollPosition, id: heading.id };
      }).filter((heading) => heading !== null)
        .sort((a, b) => b.pos - a.pos);

      const activeHeading = getAllHeadingYPositions
        .find((heading) => heading.pos <= (scrollPosition + 64 * 2.5));

      const tocLinks = document.querySelectorAll('.toc-link');
      tocLinks.forEach((tocLink) => {
        if (!activeHeading || !tocLink.href.endsWith(`#${activeHeading.id}`)) {
          tocLink.classList.remove('active');
          return;
        }

        if (tocLink.classList.contains('active')) return;

        tocLink.classList.add('active');
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsMobile, sidebarBreakpoint, tocContentRef, headings, setHeadings]);

  return <div>
    <ConditionalContainer show={isMobile}>
      <StyledToC settings={{
        supportSecondaryNavigation: props.supportSecondaryNavigation,
        sidebarBreakpoint,
        breakpointWidth,
        isMobile,
        containerMaxWidth,
      }} theme={theme}>
        <ConditionalAccordion isMobile={isMobile} header={<ToCTitle isMobile={isMobile} theme={theme}>{t('common.onThisPage')}</ToCTitle>}>
          {!headings || headings === 0 ? <Loading /> : <>
            {headings.map((heading, i) => <ToCLink
              className="toc-link"
              highlight
              key={i}
              theme={theme}
              href={`#${heading.id}`}
              style={{
                paddingLeft: theme.baseSpacingSize * (heading.h - 2) * 2,
              }}>
              <Icon iconName='chevrons-right' iconColor={colors['gray-400']} />
              {heading.text}
            </ToCLink>)}
          </>}
        </ConditionalAccordion>
      </StyledToC>
    </ConditionalContainer>
    <Container theme={theme} innerRef={tocContentRef}>
      <InnerStyledContainer>
        {props.children}
      </InnerStyledContainer>
    </Container>
  </div>;
}
