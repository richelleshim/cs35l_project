import * as React from 'react';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function ExampleFilterStatusCheckbox() {
  const [status, setStatus] = React.useState({
    declinedPayment: true,
    deliveryError: true,
    wrongAddress: false,
  });

  const [showCheckboxes, setShowCheckboxes] = React.useState(false);

  const handleFilterButtonClick = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={handleFilterButtonClick}
        sx={{ lg: 2 }}
      >
        Filter
      </Button>
      <Sheet
        variant="outlined"
        sx={{ p: 2, borderRadius: 'sm', width: 300, display: showCheckboxes ? 'block' : 'none' }}
      >
        <List>
          <ListItem>
            <Checkbox
              label="Major"
              
              overlay
              checked={status.declinedPayment}
              onChange={(event) =>
                setStatus({ ...status, declinedPayment: event.target.checked })
              }
              sx={{ color: 'inherit' }}
            />
            <Typography sx={{ ml: 'auto' }}>
              
            </Typography>
          </ListItem>
          <ListItem sx={{ borderRadius: 'sm' }}>
            <Checkbox
              label="Graduation Year"
              
              overlay
              checked={status.deliveryError}
              onChange={(event) =>
                setStatus({ ...status, deliveryError: event.target.checked })
              }
            />
            <Typography sx={{ ml: 'auto' }}>
              
            </Typography>
          </ListItem>
          
        </List>
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          
          onClick={() =>
            setStatus({
              declinedPayment: false,
              deliveryError: false,
              wrongAddress: false,
            })
          }
          sx={{ px: 1.5, mt: 1 }}
        >
          Clear All
        </Button>
      </Sheet>
    </div>
  );
}
