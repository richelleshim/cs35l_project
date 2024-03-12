import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/material/Stack';
import Sheet from '@mui/joy/Sheet';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 30, 
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: 14,
      lineHeight: '20px',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  height: '36px',
  minWidth: 'unset', // Ensure button width adjusts to its content
  padding: 0, // Removed padding
  '& .MuiButton-label': {
    width: '100%',
    justifyContent: 'center',
  },
}));

function FilterButton({ onSearch, onReset }) {
  const [showModal, setShowModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [majorInput, setMajorInput] = useState('');
  const [gradYearInput, setGradYearInput] = useState('');

  const handleSearchButtonClick = () => {
    onSearch(nameInput, majorInput, gradYearInput);
  };

  const handleResetButtonClick = () => {
    setNameInput('');
    setMajorInput('');
    setGradYearInput('');
    onReset();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ position: 'relative', paddingTop: '50px', paddingBottom: '20px', alignContent: 'center' }}>
      <Stack spacing={2} direction="row" sx={{ width: '100%', justifyContent: 'center' }}>
        <StyledTextField
          label="Name"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          sx={{ width: 250, borderRadius: '30px', height: '36px' }}
        />
        <StyledTextField
          label="Major"
          value={majorInput}
          onChange={(event) => setMajorInput(event.target.value)}
          sx={{ width: 250, borderRadius: '30px', height: '36px' }}
        />
        <StyledTextField
          label="Grad Year"
          value={gradYearInput}
          onChange={(event) => setGradYearInput(event.target.value)}
          sx={{ width: 125, borderRadius: '30px', height: '36px' }}
        />
        <StyledButton variant="variant" color="neutral" onClick={handleSearchButtonClick}>
          <SearchIcon />
        </StyledButton>
        <StyledButton variant="variant" color="neutral" onClick={handleResetButtonClick}>
          Reset
        </StyledButton>
      </Stack>
      {showModal && (
        <Sheet
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 'sm',
            width: 300,
            position: 'absolute',
            top: '100%',
            left: '100%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <CloseIcon
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              cursor: 'pointer',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <StyledButton
              variant="outlined"
              color="neutral"
              size="small"
              onClick={handleResetButtonClick}
            >
              Reset
            </StyledButton>
            <StyledButton
              variant="solid"
              color="primary"
              size="small"
              onClick={handleSearchButtonClick}
            >
              Search
            </StyledButton>
          </div>
        </Sheet>
      )}
    </div>
  );
}

export default FilterButton;
