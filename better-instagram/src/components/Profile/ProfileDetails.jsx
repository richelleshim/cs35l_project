import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
//import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';

export default function ProfileDetailsCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 1500,
        paddingTop: 11,
        paddingBottom: 6,
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
        <Avatar src="/static/images/avatar/.jpg" sx={{ width: 190, height: 190,}}/>
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center align the content horizontally
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center', // Center align the text
        }}>
        <Typography level="title-lg" sx={{ fontSize: '2.2rem' }}>Greg Heffley</Typography>
        <Typography level="title-md">@jolly_greg</Typography>
        <Typography level="title-sm" sx={{paddingTop:0.5}}>Major <Typography level="title-sm">'Grad Year</Typography> </Typography>
        <Typography level="body-sm"sx={{padding:2}}>
          Author of Diary of a Wimpy Kid
        </Typography>
      </CardContent>
      <CardActions sx={{
          display: 'flex',
          justifyContent: 'center', // Center align the buttons horizontally
        }}>
        <Button variant="outlined" color="neutral">
          Edit
        </Button>
        <Button variant="solid" color="primary">
         <a href = "mailto: jollygreg@heffley.com" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        </Button>
      </CardActions>
    </Card>
  );
}