import { Grid, Button, Typography } from "@mui/material";
import { dogsData } from "../dogsData";
import Dog from "../components/Dog";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

function AllDogScreen() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDogs(dogsData);
      setLoading(false);
    }, 500);
  }, [setDogs]);

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
            {dogs.map((dog) => {
              return (
                <Dog
                  name={dog.name}
                  key={dog.id}
                  image={dog.image}
                  modifyDog={() => ModifyDog(dog.id)}
                  deleteDog={() => DeleteDog(dog.id)}
                />
              );
            })}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <Button size="large" variant="contained" fullWidth>
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
