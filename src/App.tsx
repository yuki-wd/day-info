import React, { useState, useEffect } from 'react';
import Time from './components/Time';
import Weather from './components/Weather';
import { useTheme } from './utils/themeContext';
import styled from './utils/styled';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './App.css';

const App: React.FC = () => {
  const [coordinates, setCoodinates] = useState<Coordinates | null>(null);
  const { colorMode, setColorMode } = useTheme();
  useEffect(() => {
    if (!coordinates) {
      navigator.geolocation.getCurrentPosition(position => {
        const { coords } = position;
        setCoodinates(coords);
      });
    }
  }, [coordinates]);
  return (
    <Container>
      <CenteredItem style={{ marginRight: 20, marginBottom: 0 }}>
        <HHMM format={'HH:mm'} interval={500} />
        <SS format={':ss'} interval={500} />
      </CenteredItem>
      <CenteredItem style={{ marginRight: 20, marginTop: 20 }}>
        {coordinates && (
          <>
            <Weather lat={coordinates.latitude} lng={coordinates.longitude} />
          </>
        )}
      </CenteredItem>
      <BottomItem>
        <Toggle
          className={colorMode}
          checked={colorMode === 'light'}
          onChange={setColorMode}
          icons={{
            checked: (
              <span role="img" aria-label="dark">
                🌔
              </span>
            ),
            unchecked: (
              <span role="img" aria-label="light">
                🌞️
              </span>
            ),
          }}
        />
      </BottomItem>
    </Container>
  );
};

export default App;

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'baseline',
  background: theme.background,
  color: theme.color,
}));

const CenteredItem = styled.div({
  margin: 'auto',
  fontFamily: "'Roboto', sans-serif",
});

const BottomItem = styled.div({
  marginBottom: 16,
  marginLeft: 'auto',
  marginRight: 16,
});

const HHMM = styled(Time)({
  fontSize: 100,
});

const SS = styled(Time)({
  color: '#9e9e9e',
  fontSize: 60,
});
