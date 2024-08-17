import NextImage from 'next/image';
import { useContext } from 'react';
import styled from 'styled-components';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';
import { colors, fontSize, getFontSize } from '../../utils/themes/vars';
import TextStyle from '../_base/TextStyles';

const StyledImage = styled.span`
  background: ${colors['gray-100']};
  height: ${(props) => props.height}px;
  width: ${(props) => props.height}px;
  display: inline-block;
  vertical-align: middle;
  
  border-radius: ${(props) => props.height}px;
  margin-right: -${(props) => props.height / 3.333}px;
  border: ${(props) => props.height / (16 * props.theme.baseFontSize)}px solid ${(props) => props.theme.backgroundColor};
  overflow: hidden;

  &:first-child {
    margin-left: -${(props) => props.height / (16 * props.theme.baseFontSize)}px;
  }
`;

const StyledImageText = styled.span`
  cursor: default;
  height: ${(props) => props.height}px;
  width: ${(props) => props.height}px;
  display: inline-block;
  background: ${colors['gray-100']};

  font-size: 0.666em;
  line-height: ${(props) => props.height}px;
  text-align: center;
`;

export default function Avatars(props = {
  imageUrls: [],
  descriptors: [],
  limit: null,
}) {
  const { theme } = useContext(ThemeContext);
  const imgUrls = props.imageUrls.slice(
    0,
    props.imageUrls.length > props.limit ? props.limit - 1 : props.imageUrls.length,
  );
  const height = getFontSize(theme, fontSize.normal) * 2;
  const heightWithBorder = height + (height / (16 * theme.baseFontSize)) * 2;

  return <BaseComponent style={{ minHeight: heightWithBorder }} {...props}>
    <TextStyle style={{
      // lineHeight: `${height + (height / (16 * theme.baseFontSize)) * 2}px`,
    }}>
      {imgUrls.map((image, index) => (<StyledImage
        key={index}
        theme={theme}
        height={height}>
        <NextImage
          theme={theme}
          src={image}
          loading='lazy'
          width={height}
          height={height}
          unoptimized={true}
          alt={props?.descriptors?.[index]}
          title={props?.descriptors?.[index]}
        />
      </StyledImage>))}
      {props.imageUrls.length > props.limit && <StyledImage theme={theme} height={height}>
        <StyledImageText
          theme={theme}
          height={height}
          title={props.descriptors?.slice?.(props.limit - 1)?.join?.('\n')}
        >
          <TextStyle muted="medium">
            +{props.imageUrls.length - (props.limit - 1)}
          </TextStyle>
        </StyledImageText>
      </StyledImage>}
      <span style={{
        marginLeft: theme.baseSpacingSize - (height / (16 * theme.baseFontSize)) + height / 3.333,
      }}>
        {props.children}
      </span>
    </TextStyle>
  </BaseComponent>;
}
