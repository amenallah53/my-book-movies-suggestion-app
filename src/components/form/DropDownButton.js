import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({value,onChange}) {
  return (
    <Box sx={{ width: 300 , backgroundColor : 'white'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value} //here are the calls
          label="Select language"
          onChange={(e) => onChange(e.target.value)} //here are the calls
        >
          <MenuItem value={"ar"}>Arabic</MenuItem>
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"fr"}>French</MenuItem>
          <MenuItem value={"jp"}>Japaneese</MenuItem>
          <MenuItem value={"es"}>Spanish</MenuItem>
          <MenuItem value={"ds"}>German</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}