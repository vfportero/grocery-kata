import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';

import { GroceryProvider } from './core/context/GroceryContext';
import { groceryReducer, initialState } from './core/context/groceryReducer';
import Cart from './components/Cart/Cart';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(groceryReducer, initialState);
  
  return (
    <GroceryProvider value={{state, dispatch}}>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/cart' exact component={Cart}/>
          </Switch>
        </BrowserRouter>
      </Layout>
    </GroceryProvider>
  );
}

export default App;
