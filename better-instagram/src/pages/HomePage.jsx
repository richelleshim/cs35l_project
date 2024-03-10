// import homepagewidget
import HomePageWidget from "../components/Home/HomePageWidget";
import FilterButton from "../components/Home/FilterButton";

// import from MUI
import { Stack, Box } from "@mui/joy";
import NavBar from "../components/NavBar/NavBar";

function HomePage() {
  return (
    <>
      <Box sx={{ alignItems: "flex-start" }}>
        <NavBar />
      </Box>
      <FilterButton />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pb: 5,
          pt: 5, // Add a left margin to the content based on the navbar's width
        }}
      >
        <Stack direction="column" alignItems="flex-start" spacing={3}>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Daniel Fenex"
              desc="Likes cats."
              major="Computer Science"
              year="25"
              imageSrc="daniel"
            />
            <HomePageWidget
              name="Jennifer Lee"
              desc="I don't think YRL is good."
              major="Cognitive Science"
              year="26"
              imageSrc="jennifer"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Richelle Shim"
              desc="Hates dogs."
              major="Chicano Studies"
              year="26"
              imageSrc="richelle"
            />
            <HomePageWidget
              name="Michael J. Jordan"
              desc="Takes things personally."
              major="Chemical Sciences"
              year="24"
              imageSrc="mjj"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Michael B. Jordan"
              desc='"Whats ur number bb"'
              major="Colorado Studies"
              year="26"
              imageSrc="mjb"
            />
            <HomePageWidget
              name="Chai Chai"
              desc="I eat hamburgers."
              major="Cantonese Studies"
              year="26"
              imageSrc="chai"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            justifyContent="center"
          >
            <HomePageWidget
              name="Elizabeth Moh"
              desc="👍"
              major="Calligraphy Sciences"
              year="26"
              imageSrc="elizabeth"
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;
