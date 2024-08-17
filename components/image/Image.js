import styled from 'styled-components';
import NextImage from 'next/image';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { colors, boxShadow } from '../../utils/themes/vars';
import { ThemeContext } from '../../context/theme.context';
import TextStyle from '../_base/TextStyles';
import Icon from '../_base/Icon';
import { t } from '../../utils';
import Link from '../_base/Link';
import BaseComponent from '../BaseComponent';
import Card from '../card/Card';
import HR from '../_base/HR';

const ImageContainer = styled.div`
  background: ${colors['gray-100']};
  border-radius: ${(props) => props.roundedCorners && props.theme.baseBorderRadius * 2}px;
  height: ${(props) => (props.height ? `${props.height}px` : 'unset')};
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  aspect-ratio: ${(props) => ((props.aspectRatio && !props.height) ? props.aspectRatio : '16 / 9')};
  box-shadow: ${(props) => props.roundedCorners && boxShadow.default};

  position: relative;
  overflow: hidden;
`;

const ImageOverlay = styled.div`
  z-index: 1;
  &::before {
    background: linear-gradient(to top, 
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%  
    );
    content: "";
    height: 250%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }

  color: ${colors.white};
  padding: ${({ theme }) => theme.baseSpacingSize * 4}px;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

function ImageCaption(props) {
  return <>
    {(props.alt || props.downloadable) && (
      <TextStyle block small paddingY={2} fontWeight={'medium'} {...props.elementProps}>
        {props.downloadable && (
          <TextStyle style={{ float: 'right' }} marginLeft={2} marginBottom={2}>
            <Link href={props.src} onClick={(e) => {
              e.preventDefault();

              fetch(props.src, {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin',
              })
                .then(async (response) => ({
                  blob: await response.blob(),
                  contentType: response.headers.get('Content-Type'),
                }))
                .then(({ blob, contentType }) => {
                  let fileName = props.src.split('/').pop().split('.')[0];
                  if (props.alt) {
                    fileName = props.alt.replace(/ /g, '_')
                      .replace(/[^a-z0-9-_]/gi, '_').substr(0, 64);
                  }
                  if (contentType) {
                    if (contentType === 'image/png') fileName += '.png';
                    if (contentType === 'image/jpeg') fileName += '.jpg';
                    if (contentType === 'image/gif') fileName += '.gif';
                    if (contentType === 'image/svg+xml') fileName += '.svg';
                    if (contentType === 'image/webp') fileName += '.webp';
                    if (contentType === 'image/bmp') fileName += '.bmp';
                    if (contentType === 'image/tiff') fileName += '.tiff';
                    if (contentType === 'image/x-icon') fileName += '.ico';
                    if (contentType === 'image/vnd.microsoft.icon') fileName += '.ico';
                    if (contentType === 'image/vnd.wap.wbmp') fileName += '.wbmp';
                    if (contentType === 'image/heic') fileName += '.heic';
                    if (contentType === 'image/heif') fileName += '.heif';
                    if (contentType === 'image/avif') fileName += '.avif';
                  }

                  const url = URL.createObjectURL(new Blob([blob]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', fileName);
                  link.click();
                });

              // const link = document.createElement('a');
              // link.href = props.src;
              // link.setAttribute('download', props.alt || props.src.split('/').pop());
              // link.setAttribute('target', '_blank');
              // link.click();
            }}>
              <Icon
                title={t('common.download')}
                iconName="circle-down"
                iconSize={2}
                iconColor={colors['blue-500']}
                style={{ right: 0 }}
              />
            </Link>
          </TextStyle>
        )}
        <TextStyle style={{ display: 'inline' }} muted={'medium'}>
          {props.alt || t('common.noDescriptionAvailable')}
        </TextStyle>
      </TextStyle>
    )
    }
  </>;
}

const blurAmount = 32;
const StyledBlurredBackground = styled.div`
  background: ${colors['gray-200']};
  position: absolute;
  top: -${blurAmount * 2}px;
  left: -${blurAmount * 2}px;
  right: -${blurAmount * 2}px;
  bottom: -${blurAmount * 2}px;
  z-index: -1;

  filter: blur(${blurAmount}px);
`;

function BlurredBackground(props) {
  return <StyledBlurredBackground>
    <NextImage
      src={props.src}
      alt={props.alt}
      loading="lazy"
      fill={true}
      unoptimized={true}
      style={{ objectFit: 'cover' }} />
  </StyledBlurredBackground>;
}

function ImageCard(props) {
  const [textColor, setTextColor] = useState(props.theme.textColor);
  const { children } = props;
  const propsCopy = { ...props };
  delete propsCopy.roundedCorners;
  delete propsCopy.children;

  const imgRef = useRef(null);

  useEffect(() => {
    function getImageLightness(imageSrc, callback) {
      let colorSum = 0;
      const img = imgRef.current;

      function onload() {
        // create canvas
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.crossOrigin = 'Anonymous';

        const ctx = canvas.getContext('2d');
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colors['gray-200'];
        ctx.fill();
        ctx.drawImage(this, 0, 0, 100, 100);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;
        let r; let g; let b; let avg;

        for (let x = 0, len = data.length; x < len; x += 4) {
          r = data[x];
          g = data[x + 1];
          b = data[x + 2];

          avg = Math.floor((r + g + b) / 3);
          colorSum += avg;
        }

        const brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness);
      }

      img.onload = onload;
      if (img.complete) {
        onload.call(img);
      }
    }

    if (props.card === 'colored') {
      getImageLightness(props.src, (brightness) => {
        if (brightness > 220) {
          setTextColor(props.theme.textColor);
        } else {
          setTextColor(colors.white);
        }
      });
    }
  }, [props, setTextColor]);

  return <BaseComponent {...props} style={{ height: '100%' }}>
    <Card noMargin noPadding hoverable={props.hoverable} style={{
      position: 'relative',
      zIndex: 1,
      borderRadius: `${props.theme.baseBorderRadius * 2}px`,
      height: '100%',
    }}>
      <ImageContainer {...propsCopy} theme={props.theme}>
        <NextImage
          ref={imgRef}
          crossOrigin='Anonymous'
          src={props.src}
          alt={props.alt}
          fill={true}
          unoptimized={true}
          style={{ objectFit: 'cover' }} />
      </ImageContainer>
      {props.card !== 'colored' && <HR marginTop={0} marginBottom={4} />}
      <BaseComponent margin={4} style={{
        color: textColor,
      }}>
        {children}
        <ImageCaption {...props} elementProps={{
          marginTop: 4,
          marginBottom: 0,
          paddingY: 0,
        }} />
      </BaseComponent>
      {props.card === 'colored' && <BlurredBackground {...props} />}
    </Card>
  </BaseComponent>;
}

export default function Image(props = {
  src: null,
  height: null,
  width: null,
  downloadable: false,
  alt: null,
  roundedCorners: true,
  aspectRatio: null,
  card: false,
}) {
  const { theme } = useContext(ThemeContext);

  if (props.card) {
    return <ImageCard theme={theme} {...props} />;
  }

  return <BaseComponent {...props}>
    <ImageContainer {...{
      ...props,
      roundedCorners: props.roundedCorners !== false,
    }} theme={theme}>
      <NextImage
        src={props.src}
        alt={props.alt}
        loading="lazy"
        fill={true}
        unoptimized={true}
        style={{ objectFit: 'cover' }} />
      {props.children && <ImageOverlay theme={theme}>{props.children}</ImageOverlay>}
    </ImageContainer>
    <ImageCaption {...props} />
  </BaseComponent>;
}
