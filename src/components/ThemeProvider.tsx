import React, { useState } from 'react';
import { ThemeProvider as EmotionProvider } from 'emotion-theming';
import { ColorMode } from '../types';
import { getTheme } from '../utils/theme';
import { ThemeContext } from '../utils/themeContext';

const ThemeProvider: React.FC = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  function toggleColorMode() {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }

  return (
    <EmotionProvider theme={getTheme(colorMode)}>
      <ThemeContext.Provider
        value={{
          colorMode,
          setColorMode: toggleColorMode,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionProvider>
  );
};

export default ThemeProvider;
