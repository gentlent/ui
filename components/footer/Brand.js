import styled from 'styled-components';
import { useContext } from 'react';
import { getFontSize, fontSize } from '../../utils/themes/vars';
import Link from '../_base/Link';
import { ThemeContext } from '../../context/theme.context';

const BrandElement = styled.div`
  display: block;
  text-align: center;
  height: ${(props) => props.theme.baseSize}px;
  margin-bottom: ${(props) => props.theme.baseSize / 2}px;
`;

const BrandTextElement = styled.span`
  display: inline-block;
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 3}px;
  font-size: ${(props) => getFontSize(props.theme, fontSize.large)}px;
`;

const BrandLogoElement = styled.img`
  height: ${(props) => props.theme.baseSize - props.theme.baseSpacingSize * 3}px;
`;

export default function Brand(props) {
  const { theme } = useContext(ThemeContext);
  return <BrandElement theme={theme}>
    <Link className="link-block" style={{ outline: 'none' }} href={props.logoLink || props.titleLink || '/'}>
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
