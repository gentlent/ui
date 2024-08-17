import BaseComponent from '../BaseComponent';
import TextStyle from './TextStyles';

export default function Blockquote({ author, noMargin, children }) {
  return (
    <BaseComponent marginY={noMargin ? 0 : 4}>
      <blockquote>
        <p>
          {children}
        </p>
        {author && (<footer>
          <TextStyle muted="medium">
            <cite>&ndash; {author}</cite>
          </TextStyle>
        </footer>)}
      </blockquote>
    </BaseComponent>
  );
}
