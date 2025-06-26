
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
