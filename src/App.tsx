import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';

import { GroceryProvider } from './core/context/GroceryContext';
import { groceryReducer, initialState } from './core/context/groceryReducer';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(groceryReducer, initialState);
  
  return (
    <GroceryProvider value={{state, dispatch}}>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home}/>
          </Switch>
        </BrowserRouter>
      </Layout>
    </GroceryProvider>
  );
}

export default App;
