import { createContext, useState } from 'react';
import themes from '../utils/themes';

// This creates the context with a default value
export const ThemeContext = createContext({
  theme: themes.default,
  setTheme: () => { },
});

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState({
    ...themes.default,
    ...props.theme,
  });

  return <ThemeContext.Provider value={{
    theme,
    setTheme,
  }}>
    {props.children}
  </ThemeContext.Provider>;
};
