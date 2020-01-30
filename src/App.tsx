import React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';

const App: React.FC = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home}/>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
