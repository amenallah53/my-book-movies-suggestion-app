import Radio from '@mui/joy/Radio';
import Box from '@mui/joy/Box';

export default function RowRadioButtonsGroup({isLoading, value, onChange }) {
  return (
     <Box sx={{ display: 'flex', gap: 2 }}>
      <Radio
        disabled={isLoading}
        size="lg"
        sx={{color:'white'}}
        checked={value === 'short'}
        onChange={(e) => onChange(e.target.value)}
        label="short"
        value="short"
        name="radio-buttons"
        slotProps={{ input: { 'aria-label': 'short' } }}
      />
      <Radio
        disabled={isLoading}
        size="lg"
        sx={{color:'white'}}
        checked={value === 'medium'}
        onChange={(e) => onChange(e.target.value)}
        label="medium"
        value="medium"
        name="radio-buttons"
        slotProps={{ input: { 'aria-label': 'medium' } }}
      />
      <Radio
        disabled={isLoading}
        size="lg"
        sx={{color:'white'}}
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
