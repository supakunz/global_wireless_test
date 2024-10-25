import React from "react";
import { Grid } from "@mui/material";
import Factors from "@/components/sections/factors/Factors";
import { factors } from "../../data/factors";
import Statistics from "@/components/sections/statistics/Statistics";

const AdminPage = () => {
  return (
    <>
      <Grid container rowGap={3.75}>
        <Grid item xs={12}>
          <Factors factors={factors} />
        </Grid>
        <Grid item xs={12}>
          <Statistics />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminPage;
