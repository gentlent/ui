import Input from './Input';

export default function TextArea(props = {}) {
  const rows = props.rows || 5;
  return (
    <Input
      {...props}
      rows={rows}
      elementType="textarea"
      style={{
        resize: 'vertical',
        minHeight: `${rows * 1.5}em`,
        ...props.style,
      }}
    />
  );
}
