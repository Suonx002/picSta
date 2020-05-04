import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';

import theme from './styles/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Container maxWidth='md'>
          <Switch>
            <Route exact path='/' component={Homepage} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
