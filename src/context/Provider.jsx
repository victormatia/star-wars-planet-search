import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fecthPlanets from '../services/fetchPlanets';
import planetsContext from './planetsContext';

const initialsNumericFilters = {
  parameter: 'population',
  operator: 'maior que',
  estimatedValue: '0',
};

const INITIAL_FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_SORT = {
  parameter: 'population',
  sort: 'ASC',
};

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]); // response da requisição
  const [nameFilter, setNameFilter] = useState(''); // controlador do input de pesquisa por nome
  const [numericFilters, setNumericFilters] = useState(initialsNumericFilters); // controlador do form de filtros numéricos
  const [allFilters, setAllFilters] = useState(INITIAL_FILTERS); // array com todos os tipos de filtros numéricos
  const [applyFilters, setApplyFilters] = useState([]); // array de filtros aplicados
  const [sort, setSort] = useState(INITIAL_SORT); // controlador do form de ordenação
  const [applySort, setApplySort] = useState([]); // ordenação aplicada;

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
    allFilters: {
      allFilters,
      setAllFilters,
    },
    applyFilters: {
      applyFilters,
      setApplyFilters,
    },
    sort: {
      sort,
      setSort,
    },
    applySort: {
      applySort,
      setApplySort,
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
