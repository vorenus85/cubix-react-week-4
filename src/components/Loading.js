import { Grid } from "@mui/material";
import "./loading.css";
function Loading() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4} className="centered-animation">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
}

export default Loading;
