import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fecthPlanets from '../services/fetchPlanets';
import planetsContext from './planetsContext';

export default function Provider({ children }) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fecthPlanets();
      response.forEach((element) => delete element.residents);
      console.log(response);
      setState(response);
    };
    fetchAPI();
  }, []);

  return (
    <planetsContext.Provider value={ state }>
      { children }
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;
