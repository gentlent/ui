/* eslint-disable no-alert */
import {
  useContext, useRef, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { boxShadow } from '../../utils/themes/vars';
import Icon from '../_base/Icon';
import Button from '../button/Button';
import { ThemeContext } from '../../context/theme.context';

const EditorContainer = styled.div`
  border-radius: ${(props) => props.theme.baseBorderRadius}px;
  box-shadow: ${boxShadow.light};
`;

const EditorContent = styled.div`
  position: relative;
  height: ${(props) => props.height || 300}px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-bottom-left-radius: ${(props) => props.theme.baseBorderRadius}px;
  border-bottom-right-radius: ${(props) => props.theme.baseBorderRadius}px;
`;

const EditorMenu = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-bottom: 0;
  border-top-left-radius: ${(props) => props.theme.baseBorderRadius}px;
  border-top-right-radius: ${(props) => props.theme.baseBorderRadius}px;
`;

const MenuSelect = styled.select`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.baseBorderRadius - 2}px;
  margin: 1px;
  padding: 4px;
  float: left;
`;

const MenuDivider = styled.span`
  display: inline-block;
  width: 1px;
  height: 16px;
  margin-bottom: -4px;
  margin-left: 8px;
  margin-right: 8px;
  background: ${(props) => props.theme.borderColor};
`;

function MenuItem(props) {
  return <Button buttonStyle="flat" style={{
    padding: '4px 8px',
    margin: '1px',
  }} onClick={props.onClick}>
    <Icon name={props.name} family={props.family} style={{
      margin: 0,
      marginTop: '-2px',
      right: 0,
    }} />
  </Button>;
}

export default function Editor(props = {
  name: 'editor',
  height: 300,
  required: null,
}) {
  const { theme } = useContext(ThemeContext);
  const editorRef = useRef(null);
  const [value, setValue] = useState('');
  const [styleSelection, setStyleSelection] = useState('P');

  useEffect(() => {
    if (editorRef.current && !editorRef.current.shadowRoot) {
      const editor = editorRef.current;
      const shadow = editor.attachShadow({
        mode: 'open',
      });
      const wysiwygContainer = document.createElement('div');
      wysiwygContainer.style.height = '100%';
      wysiwygContainer.style.overflow = 'auto';

      const wysiwyg = document.createElement('div');
      wysiwyg.contentEditable = true;
      wysiwyg.style.minHeight = `calc(100% - ${theme.baseSpacingSize * 3}px)`;
      wysiwyg.style.border = '0';
      wysiwyg.style.outline = '0';
      wysiwyg.style.padding = `${theme.baseSpacingSize * 1.5}px`;
      wysiwyg.innerHTML = props.value || '';

      wysiwygContainer.appendChild(wysiwyg);
      shadow.appendChild(wysiwygContainer);

      document.execCommand('defaultParagraphSeparator', false, 'p');
      document.execCommand('AutoUrlDetect', false, true);

      const selectionChangeEvent = () => {
        const selection = shadow.getSelection();
        const element = selection.anchorNode?.tagName
          || selection.anchorNode?.parentElement?.tagName;
        setStyleSelection(element);
      };

      const inputEvent = () => {
        props.onChange(wysiwyg.innerHTML);
        setValue(wysiwyg.innerHTML);
      };

      document.addEventListener('selectionchange', selectionChangeEvent);
      wysiwyg.addEventListener('input', inputEvent);
    }
  });

  return <>
    <input
      type="hidden"
      name={props.name}
      value={value || props.value}
      required={props.required}
    />
    <EditorContainer theme={theme}>
      <EditorMenu theme={theme}>
        <MenuSelect theme={theme} onChange={(e) => {
          document.execCommand('formatBlock', false, e.target.value);
        }}>
          <option value="P" selected={styleSelection === 'P'}>Normal</option>
          <option value="PRE" selected={styleSelection === 'PRE'}>Monospace</option>
          <option value="H1" selected={styleSelection === 'H1'}>Heading 1</option>
          <option value="H2" selected={styleSelection === 'H2'}>Heading 2</option>
          <option value="H3" selected={styleSelection === 'H3'}>Heading 3</option>
          <option value="H4" selected={styleSelection === 'H4'}>Heading 4</option>
          <option value="H4" selected={styleSelection === 'H4'}>Heading 5</option>
          <option value="H6" selected={styleSelection === 'H6'}>Heading 6</option>
        </MenuSelect>
        <MenuDivider theme={theme} />
        <MenuItem name="bold" onClick={() => { document.execCommand('bold', false, null); }} />
        <MenuItem name="italic" onClick={() => { document.execCommand('italic', false, null); }} />
        <MenuItem name="underline" onClick={() => { document.execCommand('underline', false, null); }} />
        <MenuItem name="strikethrough" onClick={() => { document.execCommand('strikethrough', false, null); }} />
        <MenuDivider theme={theme} />
        <MenuItem name="subscript" onClick={() => { document.execCommand('subscript', false, null); }} />
        <MenuItem name="superscript" onClick={() => { document.execCommand('superscript', false, null); }} />
        <MenuDivider theme={theme} />
        <MenuItem name="list-ul" onClick={() => { document.execCommand('insertUnorderedList', false, null); }} />
        <MenuItem name="list-ol" onClick={() => { document.execCommand('insertOrderedList', false, null); }} />
        <MenuDivider theme={theme} />
        <MenuItem name="align-left" onClick={() => { document.execCommand('justifyLeft', false, null); }} />
        <MenuItem name="align-center" onClick={() => { document.execCommand('justifyCenter', false, null); }} />
        <MenuItem name="align-right" onClick={() => { document.execCommand('justifyRight', false, null); }} />
        <MenuItem name="align-justify" onClick={() => { document.execCommand('justifyFull', false, null); }} />
        <MenuDivider theme={theme} />
        <MenuItem name="indent" onClick={() => { document.execCommand('indent', false, null); }} />
        <MenuItem name="outdent" onClick={() => { document.execCommand('outdent', false, null); }} />
        <MenuDivider theme={theme} />
        <MenuItem name="horizontal-rule" onClick={() => { document.execCommand('insertHorizontalRule', false, null); }} />
        <MenuItem name="link" onClick={() => {
          const promptResult = window.prompt('URL:', 'https://');
          if (promptResult) document.execCommand('createLink', false, promptResult);
        }} />
        <MenuItem name="link-slash" onClick={() => { document.execCommand('unlink', false, null); }} />
        <MenuItem name="image" onClick={() => {
          const promptResult = window.prompt('URL:', 'https://');
          if (promptResult) document.execCommand('insertImage', false, promptResult);
        }} />
      </EditorMenu>
      <EditorContent height={props.height} theme={theme} ref={editorRef} />
    </EditorContainer>
  </>;
}
