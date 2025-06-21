/*import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
//import FormLabel from '@mui/material/FormLabel';
export default function RowRadioButtonsGroup({value,onChange}) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel value="short" control={<Radio />} label="short" />
        <FormControlLabel value="medium" control={<Radio />} label="medium" />
        <FormControlLabel value="long" control={<Radio />} label="long" />
      </RadioGroup>
    </FormControl>
  );
}*/

import Radio from '@mui/joy/Radio';
import Box from '@mui/joy/Box';

export default function RowRadioButtonsGroup({ value, onChange }) {
  return (
     <Box sx={{ display: 'flex', gap: 2 }}>
      <Radio
        size="lg"
        checked={value === 'short'}
        onChange={(e) => onChange(e.target.value)}
        label="short"
        value="short"
        name="radio-buttons"
        slotProps={{ input: { 'aria-label': 'short' } }}
      />
      <Radio
        size="lg"
        checked={value === 'medium'}
        onChange={(e) => onChange(e.target.value)}
        label="medium"
        value="medium"
        name="radio-buttons"
        slotProps={{ input: { 'aria-label': 'medium' } }}
      />
      <Radio
        size="lg"
        checked={value === 'long'}
        onChange={(e) => onChange(e.target.value)}
        label="long"
        value="long"
        name="radio-buttons"
        slotProps={{ input: { 'aria-label': 'long' } }}
      />
    </Box>
  );
}
