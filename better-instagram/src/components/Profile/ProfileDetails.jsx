import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function BottomActionsCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 1000,
        // to make the card resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center align the content horizontally
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar src="/static/images/avatar/1.jpg" size=""/>
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center align the content horizontally
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center', // Center align the text
        }}>
        <Typography level="title-lg">NYC Coders</Typography>
        <Typography level="body-sm">
          Insert bio here
        </Typography>
      </CardContent>
      <CardActions sx={{
          display: 'flex',
          justifyContent: 'center', // Center align the buttons horizontally
        }}>
        <IconButton variant="outlined" color="neutral" >
          <FavoriteBorder />
        </IconButton>
        <Button variant="outlined" color="neutral">
          View
        </Button>
        <Button variant="solid" color="primary">
         <a href = "mailto: abc@example.com">Contact</a>
        </Button>
      </CardActions>
    </Card>
  );
}