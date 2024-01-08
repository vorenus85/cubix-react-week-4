import { TextField, Button, Typography, Paper, Box, Grid } from "@mui/material";
import DogContext from "../DogContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

function NewDogScreen() {
  const [data, setData] = useState({});
  const { dogs, setDogs } = useContext(DogContext);
  const [nameError, setNameError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {}, []);

  async function validateName(name) {
    if (!name || name.length < 4) {
      setNameError(true);
      return Promise.reject("Invalid name");
    } else {
      setNameError(false);
      return Promise.resolve("Valid name");
    }
  }

  function checkImageExtension(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  const isValidUrl = (imageUrl) => {
    try {
      return Boolean(new URL(imageUrl));
    } catch (e) {
      setImageError(true);
      return false;
    }
  };

  async function validateImage(imageUrl) {
    if (isValidUrl(imageUrl)) {
      if (!checkImageExtension(imageUrl)) {
        setImageError(true);
        return Promise.reject("Invalid image extension");
      }

      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          setImageError(false);
          console.log("Image URL is valid");
          return response;
        } else {
          setImageError(true);
          console.log("Image URL is invalid");
          return Promise.reject("Invalid image URL");
        }
      } catch (error) {
        setImageError(true);
        console.error("Error validating image URL:", error);
        return Promise.reject(error);
      }
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    const { name, image } = data;

    let nameValidateResponse;
    let imageValidateResponse;

    try {
      nameValidateResponse = await validateName(name);
    } catch (error) {
      // Handle error from validateImage, if any
      console.error("Error validating name:", error);
    }

    try {
      imageValidateResponse = await validateImage(image);
    } catch (error) {
      // Handle error from validateImage, if any
      console.error("Error validating image:", error);
    }

    if (imageValidateResponse && nameValidateResponse) {
      const lastDog = dogs.slice(-1);
      const newDog = {
        id: lastDog.length > 0 ? lastDog[0].id + 1 : 1,
        name,
        image,
      };

      setDogs((previousValue) => {
        return [...previousValue, newDog];
      });
      navigate("/");
    }
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
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <Button variant="contained" fullWidth type="submit">
                    Add new dog
                  </Button>
                </Grid>
                <Grid item sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Back to list
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

export default NewDogScreen;
