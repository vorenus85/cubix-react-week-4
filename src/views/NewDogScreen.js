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

  function validateName(name) {
    if (!name || name.length < 4) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }

  function checkImageExtension(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
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
      if (!checkImageExtension(imageUrl)) {
        setImageError(true);
        return;
      }

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

    const lastDog = dogs.slice(-1);

    const newDog = {
      id: lastDog[0].id + 1,
      name,
      image,
    };

    setDogs((previousValue) => {
      previousValue.push(newDog);
      return [...previousValue];
    });

    navigate("/");
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
