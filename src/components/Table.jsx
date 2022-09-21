import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function Table() {
  const {
    planets,
    nameFilter: { name },
    numericFilters: { filters },
  } = useContext(planetsContext);

  const filterByName = (planetsArray) => planetsArray
    .filter((planet) => planet.name.toLowerCase().includes(name));

  const filterByNumericFilters = (planetsArray, numericFilters) => {
    switch (numericFilters.operator) {
    case 'maior que': return planetsArray.filter((planet) => (
      Number(planet[numericFilters.parameter]) > Number(numericFilters.estimatedValue)));

    case 'menor que': return planetsArray.filter((planet) => (
      Number(planet[numericFilters.parameter]) < Number(numericFilters.estimatedValue)));

    case 'igual a': return planetsArray.filter((planet) => (
      Number(planet[numericFilters.parameter])
      === Number(numericFilters.estimatedValue)));

    default: return planetsArray;
    }
  };

  const filter = (searchName, numericFilters) => {
    if (searchName.length > 0) return filterByName(planets);
    if (numericFilters.wasSearchedByNumericFilters) {
      return filterByNumericFilters(planets, filters);
    }
    return planets;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Priod</th>
          <th>Orbital Priod</th>
          <th>Diamiter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { planets.length ? filter(name, filters).map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        )) : null }
      </tbody>
    </table>
  );
}
