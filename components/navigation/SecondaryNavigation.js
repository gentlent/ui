import { useContext } from 'react';
import Navigation from './Navigation';
import NavigationLink from './NavigationLink';
import { ThemeContext } from '../../context/theme.context';

export function SecondaryNavigationLink(props) {
  return <NavigationLink {...props} />;
}

export default function SecondaryNavigation(props) {
  const { theme } = useContext(ThemeContext);
  return <Navigation {...props}
    theme={{ navBackground: theme.secondaryBackgroundColor, ...props.theme }}
    _isSecondary={true} />;
}
