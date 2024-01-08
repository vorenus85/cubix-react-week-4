import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

function Dog({ name, image, deleteDog }) {
  return (
    <Grid item xs={12} lg={3} md={4} sm={6}>
      <Card style={{ marginBottom: "1rem" }}>
        <CardMedia component="img" height="250" image={image}></CardMedia>
        <CardContent>
          <Typography variant="h4">{name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="error"
            fullWidth
            onClick={deleteDog}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Dog;
