import { Grid, Button, Typography } from "@mui/material";
import Dog from "../components/Dog";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import DogContext from "../DogContext";

function AllDogScreen() {
  const { dogs, setDogs } = useContext(DogContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const navigateToNewDog = () => {
    navigate("/dog/new");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const ModifyDog = (id) => {
    console.log("ModifyDog clicked: " + id);
  };

  const DeleteDog = (id) => {
    const selectedDogIndex = dogs.findIndex((dog) => dog.id === id);
    setDogs((previousValue) => {
      previousValue.splice(selectedDogIndex, 1);
      return [...previousValue];
    });
  };

  return (
    <div>
      <Typography variant="h2" component="h2" mb={3}>
        Dog catalog
      </Typography>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div>
          <Grid container spacing={2}>
            <DogContext.Consumer>
              {(value) =>
                value.dogs.map((dog) => {
                  return (
                    <Dog
                      name={dog.name}
                      key={dog.id}
                      image={dog.image}
                      modifyDog={() => ModifyDog(dog.id)}
                      deleteDog={() => DeleteDog(dog.id)}
                    />
                  );
                })
              }
            </DogContext.Consumer>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={navigateToNewDog}
              >
                Add new dog
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default AllDogScreen;
