import React, { useState } from 'react';
import Home from './Pages/Home';
import './App.css';

import Context from './Contexts/context';

function App() {

  const initialState = {
    data: undefined,
    facets: undefined,
    filters: '',
    queryString: '',
    search: {
      type: '',
      term: '',
      toggleDate: false,
      initialDate: '',
      finalDate: ''
  }
}

  const [context, setContext] = useState(initialState)

  return (
    <Context.Provider value={[context, setContext]}>
      <Home />
    </Context.Provider>
  );
}

export default App;