import styled from 'styled-components';
import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';
import BaseComponent from '../BaseComponent';
import { ThemeContext } from '../../context/theme.context';
import {
  boxShadow, colors, emphasize, transitions,
} from '../../utils/themes/vars';
import Icon from '../_base/Icon';
import { t } from '../../utils';
import Code from '../_base/Code';
import TextStyle from '../_base/TextStyles';

const StyledGroup = styled(BaseComponent)`
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.baseBorderRadiusSmall}px;
  border: 1px solid ${colors['gray-200']};
  box-sizing: border-box;
  box-shadow: ${boxShadow.light};
  display: flex;
  ${({ noMargin, theme }) => !noMargin && `
    margin: ${theme.baseSpacingSize}px 0;
  `}
  outline-offset: 0px;
  padding: 0;
  position: relative;
  width: 100%;

  ${({ inline }) => inline && `
    border: 1px solid transparent;
    box-shadow: none;
  `}

  ${({ disabled }) => disabled && `
    background: ${colors['gray-100']};
  `}

  ${({ inline, disabled }) => inline && disabled && `
    background: transparent;
    opacity: ${emphasize.disabled};
  `}
`;

const StyledInput = styled(BaseComponent)`
  background: transparent;
  border: none;
  display: inline-block;
  line-height: ${({ theme }) => theme.baseLineHeight};
  margin: ${({ theme }) => theme.baseSpacingSize}px ${({ theme }) => theme.baseSpacingSize * 1.5}px;
  margin-top: ${({ theme }) => theme.baseSpacingSize - 1}px;
  margin-bottom: ${({ theme }) => theme.baseSpacingSize + 1}px;
  padding: 0;
  width: 100%;
  transition: all 0.2s ${transitions.default};
  appearance: none;
  color: ${({ theme }) => theme.textColor};

  ${({ inline, theme }) => inline && `
    margin-top: ${theme.baseSpacingSize / 2 - 1}px !important;
    margin-bottom: ${theme.baseSpacingSize / 2 + 1}px !important;
  `}

  ${({ inline, disabled }) => inline && !disabled && `
    :not(:focus) {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: from-font;
    }

    outline: none !important;
  `}

  ${({ icon, theme }) => icon && `
    margin-left: ${theme.baseSpacingSize * 1.5}px;
  `}

  &::placeholder {
    color: ${colors['gray-500']};
  }

  &:focus-visible {
    outline: none !important;
  }

  ${({ disabled }) => disabled && `
    color: ${colors['gray-600']};
    cursor: not-allowed;
    opacity: 1;
    -webkit-text-fill-color: ${colors['gray-600']};
  `}
`;

const StyledIcon = styled(Icon)`
  flex-shrink: 0;
  right: 0;
  bottom: -${({ theme }) => theme.baseSpacingSize * 0.5}px;
  right: -1.5px;
  margin-right: 0px;
`;

const StyledText = styled.span`
  box-sizing: border-box;
  color: ${colors['gray-500']};
  display: inline-block;
  line-height: ${({ theme }) => theme.baseLineHeight};
  vertical-align: middle;
  margin: ${({ theme }) => theme.baseSpacingSize}px ${({ theme }) => theme.baseSpacingSize * 1.5}px;
  margin-top: ${({ theme }) => theme.baseSpacingSize - 1}px;
  margin-bottom: ${({ theme }) => theme.baseSpacingSize + 1}px;
  white-space: nowrap;

  ${({ inline, theme }) => inline && `
    margin-top: ${theme.baseSpacingSize / 2 - 1}px !important;
    margin-bottom: ${theme.baseSpacingSize / 2 + 1}px !important;
  `}

  ${({ pos }) => pos === 'left' && `
    margin-right: -1px;
  `}

  ${({ pos }) => pos === 'right' && `
    margin-left: -1px;
  `}
`;

export default function Input(props = {
  icon: null,
  autoFocus: null,
}) {
  const { theme } = useContext(ThemeContext);
  const GroupRef = React.createRef();
  const ChevronRef = React.createRef();
  const IconRef = React.createRef();
  const ErrorRef = React.createRef();
  const InputRef = props.baseRef || React.createRef();

  const onFocus = useCallback(() => {
    if (ChevronRef.current) {
      ChevronRef.current.style.transform = 'rotate(180deg)';
    }

    if (GroupRef.current) {
      if (!props.inline) {
        GroupRef.current.style.outline = `2px solid ${theme.primary}`;
      } else {
        GroupRef.current.style.backgroundColor = `${theme.secondaryBackgroundColor}`;
      }
    }
  }, [ChevronRef, GroupRef, props.inline, theme.primary, theme.secondaryBackgroundColor]);

  const onBlur = (e) => {
    if (ChevronRef.current) {
      ChevronRef.current.style.transform = 'rotate(0deg)';
    }

    if (GroupRef.current) {
      if (!props.inline) {
        GroupRef.current.style.outline = 'none';
      } else {
        GroupRef.current.style.backgroundColor = 'transparent';
        GroupRef.current.style.border = '1px solid transparent';
      }
    }

    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const potentialErrors = {
    badInput: t('common.formError.badInput'),
    customError: t('common.formError.customError'),
    patternMismatch: t('common.formError.patternMismatch'),
    rangeOverflow: t('common.formError.rangeOverflow'),
    rangeUnderflow: t('common.formError.rangeUnderflow'),
    stepMismatch: t('common.formError.stepMismatch'),
    tooLong: t('common.formError.tooLong'),
    tooShort: t('common.formError.tooShort'),
    typeMismatch: t('common.formError.typeMismatch'),
    valueMissing: t('common.formError.valueMissing'),
    unknown: t('common.formError.unknown'),
  };

  const setError = (text) => {
    if (typeof text === 'string') {
      GroupRef.current.style.borderColor = colors['red-400'];
      if (IconRef.current) {
        let url = getComputedStyle(IconRef.current).backgroundImage
          .match(/https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/)[0];
        url = url.replace(`=${colors['gray-500'].substr(1)}`, `=${colors['red-400'].substr(1)}`);
        IconRef.current.style.backgroundImage = `url("${url}")`;
      }

      ErrorRef.current.style.display = 'inline-block';
      ErrorRef.current.innerText = text;
      InputRef.current.style.marginTop = `${theme.baseSpacingSize * 1.5 - 1}px`;
      InputRef.current.style.marginBottom = `${theme.baseSpacingSize * 0.5 + 1}px`;
    } else {
      GroupRef.current.style.borderColor = colors['gray-200'];
      if (IconRef.current) {
        let url = getComputedStyle(IconRef.current).backgroundImage
          .match(/https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/)[0];
        url = url.replace(`=${colors['red-400'].substr(1)}`, `=${colors['gray-500'].substr(1)}`);
        IconRef.current.style.backgroundImage = `url("${url}")`;
      }

      ErrorRef.current.style.display = 'none';
      InputRef.current.style.marginTop = `${theme.baseSpacingSize - 1}px`;
      InputRef.current.style.marginBottom = `${theme.baseSpacingSize + 1}px`;
    }
  };

  const onChange = async (e) => {
    const el = e.target;

    if (el) {
      const currentError = Object.keys(potentialErrors).find((x) => el.validity[x]);

      if (currentError) {
        setError(potentialErrors[currentError]);
      } else if (!el.validity.valid) {
        setError(potentialErrors.unknown);
      } else {
        setError(false);
      }
    }

    if (props.onChange) {
      props.onChange(e);
    }
  };

  if (props.error) {
    setError(props.error);
  }

  // Shortcuts
  const [shortcutModifier, setShortcutModifier] = useState('');
  useEffect(() => {
    if (props.autoFocus) {
      InputRef?.current?.focus?.();
      onFocus();
    }

    if (props.shortcut) {
      window.pressedKeys = [];

      const onKeyDown = (e) => {
        if (e.key === props.shortcut.toLowerCase() && !window.pressedKeys.includes(e.key)) {
          window.pressedKeys.push(e.key);
        }
        if ((e.key === 'Meta' || e.key === 'Control') && !(
          window.pressedKeys.includes('Meta') || window.pressedKeys.includes('Control')
        )) {
          window.pressedKeys.push(e.key);
        }
        if (window.pressedKeys.length === 2) {
          e.preventDefault();
          InputRef?.current?.focus?.();
        }
      };

      const onKeyUp = (e) => {
        if (e.key === props.shortcut.toLowerCase() || e.key === 'Meta' || e.key === 'Control') {
          window.pressedKeys = [];
        }
      };

      if (navigator.platform.indexOf('Mac') > -1) {
        setShortcutModifier('⌘ ');
      } else {
        setShortcutModifier('^');
      }

      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);

      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
      };
    }

    return () => { };
  }, [props.shortcut, InputRef, props.autoFocus, onFocus]);
  // End Shortcuts

  return (
    <>
      {props.disabled && props.name && props.value && (
        <input type="hidden" name={props.name} value={props.value} />
      )}
      <StyledGroup
        baseRef={GroupRef}
        theme={theme}
        disabled={props.disabled}
        elementType="div"
        style={{ ...props.style }}
        noMargin={props.noMargin}
        inline={props.inline}>
        {props.icon && <StyledIcon
          theme={theme}
          baseRef={IconRef}
          iconName={props.icon}
          iconColor={colors['gray-500']}
          marginLeft={1.5}
          marginY={1}
          iconSize={1} />}
        {props.textLeft && <StyledText
          theme={theme} pos={'left'} inline={props.inline}>
          {props.textLeft}
        </StyledText>}
        <StyledInput
          elementType="input"
          {...props}
          baseRef={InputRef}
          theme={theme}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        {props.elementType === 'select' && (
          <Icon iconName="chevron-down" baseRef={ChevronRef} iconColor={theme.textColor} style={{
            position: 'relative',
            left: '-1em',
            bottom: '-0.9em',
            opacity: emphasize.medium,
          }} />
        )}
        {(props.textRight || shortcutModifier) && <StyledText
          theme={theme} pos={'right'}>
          {props.textRight}
          {shortcutModifier && <>
            <TextStyle small marginLeft={1} desktopOnly>
              <Code style={{ fontFamily: 'inherit', color: colors['gray-500'] }}>
                {shortcutModifier} {props.shortcut?.toUpperCase?.()}
              </Code>
            </TextStyle>
          </>}
        </StyledText>}

        <StyledText ref={ErrorRef}
          theme={theme} pos={'right'} style={{
            display: 'none',
            position: 'absolute',
            right: theme.baseSpacingSize * 1.5,
            left: props.icon ? theme.baseSpacingSize * 4.5 : theme.baseSpacingSize * 1.5,
            color: colors['red-400'],
            fontSize: '0.5em',
            top: props.inline ? 'unset' : '-0.5em',
            bottom: props.inline ? '-2em' : 'unset',
            textAlign: 'left',
            // Truncate
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}></StyledText>
      </StyledGroup>
    </>
  );
}
