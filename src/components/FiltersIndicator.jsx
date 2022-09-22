import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function FiltersIndicator() {
  const {
    applyFilters: { applyFilters, setApplyFilters },
    allFilters: { allFilters, setAllFilters },
  } = useContext(planetsContext);

  const onClick = ({ target }) => {
    setApplyFilters(applyFilters.filter((filter) => filter.parameter !== target.name));
    setAllFilters([...allFilters, target.name]);
  };

  const clearAllFilters = () => {
    setApplyFilters([]);
  };

  return (
    <section>
      {
        applyFilters.length > 0
        && (
          <button
            type="button"
            onClick={ clearAllFilters }
            data-testid="button-remove-filters"
          >
            Remover todos os filtros
          </button>
        )
      }
      { applyFilters.map((filter, i) => (
        <div key={ i } data-testid="filter">
          {
            `Filtro: ${filter.parameter} ${filter.operator} ${filter.estimatedValue}`
          }
          <button
            name={ filter.parameter }
            type="button"
            onClick={ onClick }
          >
            Remover filtro

          </button>
        </div>
      )) }
    </section>
  );
}
