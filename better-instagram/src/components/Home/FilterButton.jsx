import * as React from 'react';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import CloseIcon from '@mui/icons-material/Close';

export default function FilterButton() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedMajor, setSelectedMajor] = React.useState('');
  const [selectedGradYear, setSelectedGradYear] = React.useState('');
  const [majorInput, setMajorInput] = React.useState('');
  const [gradYearInput, setGradYearInput] = React.useState('');

  const handleFilterButtonClick = () => {
    setShowModal(true);
  };

  const handleSearchButtonClick = () => {
    console.log('Searching with Major:', selectedMajor, 'and Graduation Year:', selectedGradYear);
  };

  const handleClearAllClick = () => {
    setSelectedMajor('');
    setSelectedGradYear('');
    setMajorInput('');
    setGradYearInput('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ position: 'relative', paddingTop: '50px', paddingBottom: '0px'}}>
      <Button
        variant="outlined"
        color="neutral"
        onClick={handleFilterButtonClick}
        sx={{ position: 'relative', zIndex: 1}} 
      >
        Filter
      </Button>
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
          <List>
            <ListItem>
              <Typography sx={{fontSize: 'small'}}>Major</Typography>
              <input
                type="text"
                value={majorInput}
                onChange={(event) => setMajorInput(event.target.value)}
                placeholder="Search Majors"
                style={{ width: '100%' }}
              />
            </ListItem>
            <ListItem>
              <Typography sx={{fontSize: 'small'}} >Graduation Year</Typography>
              <input
                type="number"
                value={gradYearInput}
                onChange={(event) => setGradYearInput(event.target.value)}
                placeholder="Enter Graduation Year"
                style={{ width: '100%' }}
              />
            </ListItem>
          </List>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="neutral"
              size="small"
              onClick={handleClearAllClick}
            >
              Clear All
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="small"
              onClick={handleSearchButtonClick}
            >
              Search
            </Button>
          </div>
        </Sheet>
      )}
    </div>
  );
}