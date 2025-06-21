/*import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';*/

/*export default function BasicSelect({value,onChange}) {
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
}*/

import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function BasicSelect({value,onChange}) {
  return (
    <Select 
      size="lg"
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      placeholder="Select language"
      sx={{ width: 300 }}
    >
      <Option value="ar">Arabic</Option>
      <Option value="en">English</Option>
      <Option value="fr">French</Option>
      <Option value="jp">Japanese</Option>
      <Option value="es">Spanish</Option>
      <Option value="ds">German</Option>
    </Select>
  );
}
