import Checkbox from "@mui/joy/Checkbox";
import Box from "@mui/joy/Box";

function CheckBoxButtonsGroup({ isLoading, value, onChange }) {
  const handleCheck = (checkedValue) => {
    if (value.includes(checkedValue)) {
      // Remove it
      onChange(value.filter((v) => v !== checkedValue));
    } else {
      // Add it
      onChange([...value, checkedValue]);
    }
  };

  return (
    <Box sx={{ display: 'flex' , gap: 2 }}>
      <Checkbox
        sx={{color:'white'}}
        disabled={isLoading}
        size="lg"
        checked={value.includes('Reputation')}
        onChange={() => handleCheck('Reputation')}
        label="Reputation"
        slotProps={{ input: { 'aria-label': 'Reputation' } }}
      />
      <Checkbox
        sx={{color:'white'}}
        disabled={isLoading}
        size="lg"
        checked={value.includes('Award Wins')}
        onChange={() => handleCheck('Award Wins')}
        label="Award Wins"
        slotProps={{ input: { 'aria-label': 'Award Wins' } }}
      />
      <Checkbox
        disabled={isLoading}
        sx={{color:'white'}}
        size="lg"
        checked={value.includes('Popularity & Audience Ratings')}
        onChange={() => handleCheck('Popularity & Audience Ratings')}
        label="Popularity & Audience Ratings"
        slotProps={{ input: { 'aria-label': 'Popularity' } }}
      />
    </Box>
  );
}

export default CheckBoxButtonsGroup;
