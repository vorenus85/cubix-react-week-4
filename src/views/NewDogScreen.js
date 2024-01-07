import { TextField, Button, Typography, Paper, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

function NewDogScreen() {
  const [data, setData] = useState({});
  const [nameError, setNameError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {}, []);

  function validateName(name) {
    if (!name || name.length < 4) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }

  function validateImage(imageUrl) {
    const isValidUrl = (imageUrl) => {
      try {
        return Boolean(new URL(imageUrl));
      } catch (e) {
        setImageError(true);
        return false;
      }
    };

    if (isValidUrl(imageUrl)) {
      fetch(imageUrl)
        .then((response) => {
          console.log(response);
          if (response.ok) {
            setImageError(false);
            console.log("Image URL is valid");
          } else {
            setImageError(true);
            console.log("Image URL is invalid");
          }
        })
        .catch((error) => {
          setImageError(true);
          console.error("Error validating image URL:", error);
        });
    }
  }

  const submit = (e) => {
    e.preventDefault();
    const { name, image } = data;
    validateName(name);
    validateImage(image);
  };

  return (
    <div>
      <Typography variant="h2" component="h2" mb={3}>
        Add new dog
      </Typography>
      <Paper style={{ padding: "1rem" }}>
        <Box component="form" noValidate autoComplete="off" onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={nameError}
                id="name"
                name="name"
                label="Dog name"
                variant="outlined"
                onChange={updateData}
                helperText={
                  nameError
                    ? "Please give a name for the dog. Minimum length 4 characters."
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={imageError}
                name="image"
                id="image"
                label="Dog image"
                variant="outlined"
                onChange={updateData}
                helperText={imageError ? "Please give a valid image url" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button size="large" variant="contained" fullWidth type="submit">
                Add new dog
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

export default NewDogScreen;
