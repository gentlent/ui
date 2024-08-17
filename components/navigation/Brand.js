import styled from 'styled-components';
import { useContext } from 'react';
import {
  getFontSize, fontWeight, fontSize, breakpointWidth, fontStack,
} from '../../utils/themes/vars';
import Link from '../_base/Link';
import { ThemeContext } from '../../context/theme.context';

const BrandElement = styled.div`
  display: inline-block;
  height: ${(props) => props.theme.baseSize}px;
  padding: ${(props) => props.theme.baseSpacingSize * 2}px 0px;
  line-height: 1.6em;
  position: relative;
  flex: 0 0 auto;
  margin-right: ${(props) => props.theme.baseSpacingSize * 4}px;
  @media (max-width: ${breakpointWidth}px) {
    text-align: center;
    display: block;
    width: 100%;
  }

  a {
    color: inherit;
  }
`;

const BrandTextElement = styled.span`
  color: currentColor;
  display: inline-block;
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 4.5}px;
  font-size: ${(props) => getFontSize(props.theme, fontSize.large)}px;
  font-weight: ${fontWeight.medium};
  margin: ${(props) => props.theme.baseSpacingSize * 0.5}px 0 0;
  max-width: calc(100vw - ${(props) => props.theme.baseSpacingSize * 16}px);
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @font-face {
    font-family: 'CalSans';
    src: url("https://s1.gentcdn.com/fonts/Gilroy-Bold.woff2") format('woff2'),
        url("https://s1.gentcdn.com/fonts/Gilroy-Bold.woff") format('woff');
  }
  font-family: 'CalSans', ${fontStack.default};
`;

const BrandLogoElement = styled.img`
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 4.5}px;
  margin: ${(props) => props.theme.baseSpacingSize * 0.25}px 0 0;
  flex: 0 0 auto;
`;

// title={props.title}
// titleLink={props.titleLink}
// logoUrl={props.logoUrl}
// logoLink={props.logoLink}
export default function Brand(props) {
  const { theme: themeContext } = useContext(ThemeContext);
  const theme = { ...themeContext, ...props.theme };
  return <BrandElement theme={theme}>
    <Link className="link-block" unstyled style={{ outline: 'none' }} href={props.logoLink || props.titleLink || '/'}>
      {props.logoUrl
        ? <BrandLogoElement theme={theme}
          height={theme.baseSize - theme.baseSpacingSize * 4.5}
          src={props.logoUrl}
          alt={props.title} />
        : <BrandTextElement theme={theme}>{props.title}</BrandTextElement>
      }
    </Link>
  </BrandElement>;
}
