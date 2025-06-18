import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="short" control={<Radio />} label="short" />
        <FormControlLabel value="medium" control={<Radio />} label="medium" />
        <FormControlLabel value="long" control={<Radio />} label="long" />
      </RadioGroup>
    </FormControl>
  );
}