import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fecthPlanets from '../services/fetchPlanets';
import planetsContext from './planetsContext';

const initialsNumericFilters = {
  parameter: 'population',
  operator: 'maior que',
  estimatedValue: '0',
};

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState(initialsNumericFilters);
  const [applyFilters, setApplyFilters] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fecthPlanets();
      response.forEach((element) => delete element.residents);
      setPlanets(response);
    };
    fetchAPI();
  }, []);

  const context = {
    planets,
    nameFilter: {
      name: nameFilter,
      setNameFilter,
    },
    numericFilters: {
      filters: numericFilters,
      setNumericFilters,
    },
    applyFilters: {
      applyFilters,
      setApplyFilters,
    },
  };

  return (
    <planetsContext.Provider value={ context }>
      { children }
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;
