import { useContext } from 'react';
import Marquee from 'react-fast-marquee';
import { ThemeContext } from '../../context/theme.context';
import { convertColorHexToRgb } from '../../utils/themes/vars';

export default function MarqueeComponent(props = {
  noPointerEvents: false,
}) {
  const { theme } = useContext(ThemeContext);

  return <Marquee
    play={true}
    autoFill={true}
    gradient={true}
    gradientColor={convertColorHexToRgb(props.backgroundColor || theme.backgroundColor).split(', ')}
    gradientWidth={'20%'}
    {...props}
    style={{
      ...(props.noPointerEvents ? { pointerEvents: 'none' } : {}),
      ...props.style,
    }}>
    {props.children}
  </Marquee>;
}
