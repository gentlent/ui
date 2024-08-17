import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme.context';
import {
  colors, emphasize, fontSize, lineHeight, fontWeight, transitions, convertColorHexToRgb,
} from '../../utils/themes/vars';
import Icon from '../_base/Icon';
import Button from '../button/Button';
import Pill from '../badge/Pill';
import { t } from '../../utils';

const StyledModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 900000;

  @media (max-width: 480px) {
    align-items: flex-end;
  }
`;

const StyledBackgroundLayer = styled.div`
  background-color: rgba(${convertColorHexToRgb(colors.black)}, ${emphasize.medium});

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  
  z-index: 1;

  animation: fadeIn .2s ${transitions.default};
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledModal = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  color: ${(props) => props.theme.textColor};
  width: 480px;
  max-width: 100%;
  max-height: 95%;
  max-height: calc(100% - ${(props) => props.theme.baseSpacingSize * 4}px);

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  animation: slideIn .2s ${transitions.default};
  @keyframes slideIn {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const StyledModalHeaderProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  border-radius: ${(props) => props.theme.baseBorderRadius}px ${(props) => props.theme.baseBorderRadius}px 0 0;
  height: ${(props) => props.theme.baseBorderRadius}px;
  width: 100%;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    background-color: rgba(${(props) => convertColorHexToRgb(props.theme.primary)}, ${1 - emphasize.high});
    height: 4px;
    width: 100%;
    position: absolute;
    top: 0;
  }

  &:after {
    content: '';
    display: block;
    background-color: ${(props) => props.theme.primary};
    height: 4px;
    width: ${(props) => props.progress}%;
    transition: .2s width ${transitions.default};
    position: absolute;
    top: 0;
  }
`;

const StyledModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${(props) => props.theme.baseSpacingSize * 4}px;
`;

const StyledModalHeaderTitle = styled.span`
  flex: 1;
  hyphens: auto;
  font-size: ${fontSize.large}rem;
  line-height: ${lineHeight.normal}em;
  font-weight: ${fontWeight.semibold};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 1080px) {
    font-size: ${fontSize.normal}rem;
  }
`;

const StyledModalHeaderCloseButton = styled.button`
  margin-left: ${(props) => props.theme.baseSpacingSize * 2}px;
  font-size: ${fontSize.large}rem;
  background: none;
  border: none;
  cursor: pointer;

  opacity: ${emphasize.disabled};
  transition: .1s opacity ${transitions.default};

  &:hover {
    opacity: ${emphasize.high};
  }
`;

const StyledModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: show;
  padding: 0 ${(props) => props.theme.baseSpacingSize * 4}px ${(props) => props.theme.baseSpacingSize * 4}px;

  ${(props) => props.noPadding && `
    padding: 0;
  `}
`;

const StyledModalFooter = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: ${(props) => props.theme.baseSpacingSize * 2}px ${(props) => props.theme.baseSpacingSize * 4}px;
  text-align: right;
`;

const StyledModalFooterButton = styled(Button)``;

export default function Modal(props = {
  title: null,
  options: null,
  forced: null,
  opened: null,
  onClose: null,
}) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!props.forced) {
      const onKeyDown = (e) => {
        if (e.key === 'Escape') {
          props.onClose();
        }
      };

      window.addEventListener('keydown', onKeyDown);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }

    return () => { };
  });

  return <>
    {props.opened && <>
      <StyledModalContainer>
        <StyledBackgroundLayer {...{ onClick: !props.forced && (props.onClose || undefined) }} />
        <StyledModal theme={theme}>
          <StyledModalHeader
            theme={theme}>
            {props.currentStep && props.totalSteps && <StyledModalHeaderProgressBar
              theme={theme}
              progress={(props.currentStep / props.totalSteps) * 100}
            />}
            <StyledModalHeaderTitle noMargin theme={theme}>
              {props.title}
              {props.currentStep && props.totalSteps && <>
                &nbsp;
                <Pill>{t('common.XofY', {
                  x: props.currentStep,
                  y: props.totalSteps,
                })}</Pill>
              </>}
            </StyledModalHeaderTitle>
            {!props.forced && <StyledModalHeaderCloseButton theme={theme}
              onClick={props.onClose || null}>
              <Icon iconName="times" iconColor={theme.textColor} style={{ bottom: 1.25, right: 0, margin: 0 }} />
            </StyledModalHeaderCloseButton>}
          </StyledModalHeader>
          <StyledModalBody noPadding={props.noPadding} theme={theme}>
            {props.children}
          </StyledModalBody>
          {props.options && (
            <StyledModalFooter theme={theme}>
              {props.options && props.options.map((option) => (
                <StyledModalFooterButton theme={theme}
                  key={Math.random()}
                  {...option}>
                  {option.label}
                </StyledModalFooterButton>
              ))}
            </StyledModalFooter>
          )}
        </StyledModal>
      </StyledModalContainer>
    </>}
  </>;
}
