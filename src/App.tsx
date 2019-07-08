import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Time from './components/Time';
import Weather from './components/Weather';

const App: React.FC = () => {
  const [coordinates, setCoodinates] = useState<Coordinates | null>(null);
  useEffect(() => {
    if (!coordinates) {
      navigator.geolocation.getCurrentPosition(position => {
        const { coords } = position;
        setCoodinates(coords);
      });
    }
  }, [coordinates]);
  console.log(coordinates);
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
    </Container>
  );
};

export default App;

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'baseline',
});

const CenteredItem = styled.div({
  margin: 'auto',
  fontFamily: "'Roboto', sans-serif",
});

const HHMM = styled(Time)({
  fontSize: 100,
});

const SS = styled(Time)({
  color: '#9e9e9e',
  fontSize: 60,
});
