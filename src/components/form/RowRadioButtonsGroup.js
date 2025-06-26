

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
