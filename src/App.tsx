import React from 'react';
import styled from '@emotion/styled';
import Time from './components/Time';

const App: React.FC = () => {
  return (
    <Container>
      <CenteredItem>
        <HHMM format={'HH:mm'} interval={500} />
        <SS format={':ss'} interval={500} />
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
});

const CenteredItem = styled.div({
  margin: 'auto',
  fontFamily: "'Roboto', sans-serif",
});

const HHMM = styled(Time)({
  fontSize: 80,
});

const SS = styled(Time)({
  color: '#9e9e9e',
  fontSize: 50,
});
