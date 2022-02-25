import React, { ChangeEvent } from 'react';
import {
  NativeSelect,
  FormControl,
} from '@mui/material';
import { useAppContext } from '../context/use-app-context';

export default function CountrySelector() : JSX.Element {
  const appContext = useAppContext();
  const { countries, selectedCountry, setSelectedCountry } = appContext;

  if (countries.length === 0 || !selectedCountry) {
    return null;
  }

  const handleChangeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((country) => country.name === event.target.value);
    if (country) {
      setSelectedCountry(country);
    }
  }

  return (
    <FormControl sx={{ m: 1 }}>
      <NativeSelect
        value={selectedCountry.name}
        onChange={handleChangeCountry}
        inputProps={{
          name: 'country',
          id: 'country-selector',
        }}
      >
        {countries.map((country) => (
          <option value={country.name} key={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}