import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetchPlanets from './helpers/mockFetchPlanets';

const ROW_NAME_THEAD = "Name Rotation Priod Orbital Priod Diamiter Climate Gravity Terrain Surface Water Population Films Created Edited URL"

describe('Implementa casos de testes na aplicação', () => {
  it('Testa se a tela inicial é renderizada corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFetchPlanets),
    })

    render(<App />)

    screen.debug();
    const title = screen.getByRole('heading', { level: 1, name: /project star wars/i });
    const inputName = screen.getByTestId(/name-filter/i)
    const inputParameters = screen.getByTestId(/column-filter/i)
    const inputOperators = screen.getByTestId(/comparison-filter/i)
    const inputEstimatedValue = screen.getByTestId(/value-filter/i)
    const filterButton = screen.getByTestId(/button-filter/i)

    expect(title).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputParameters).toBeInTheDocument();
    expect(inputOperators).toBeInTheDocument();
    expect(inputEstimatedValue).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    await waitFor(() => {
      const rows = screen.getAllByRole('row')
      expect(rows).toHaveLength(11)
    })

  })
})
