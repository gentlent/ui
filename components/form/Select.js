import Input from './Input';
import t from '../../utils/i18n';

export default function Select(props = {
  items: [],
}) {
  const propsCopy = { ...props };
  const items = props.items || [{
    key: 'none',
    label: '-',
    disabled: true,
    selected: true,
  }];

  delete propsCopy.items;

  const hasDefault = items.some((item) => item.selected);

  return (
    <Input
      {...propsCopy}
      elementType="select">
      {!hasDefault && (<option disabled selected>
        {t('common.select')}
      </option>)}
      {items.map((item) => (
        <option
          key={item.key}
          value={item.key}
          disabled={item.disabled}
          selected={item.selected}>
          {item.label}</option>
      ))}
    </Input>
  );
}
