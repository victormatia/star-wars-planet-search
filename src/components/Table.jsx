import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function Table() {
  const { planets, nameFilter: { name } } = useContext(planetsContext);

  const filterByName = (planetsArray) => planetsArray
    .filter((planet) => planet.name.toLowerCase().includes(name));

  const filter = name.length > 0 ? filterByName(planets) : planets;

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
        { planets.length ? filter.map((planet) => (
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
