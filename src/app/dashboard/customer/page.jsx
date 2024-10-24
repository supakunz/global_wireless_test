import { Grid } from "@mui/material";
import CustomerTable from "@/components/sections/CustomerTable";

const CustomerPage = () => {
  return (
    <Grid container rowGap={3.75}>
      <Grid item xs={12}>
        <CustomerTable />
      </Grid>
    </Grid>
  );
};

export default CustomerPage;
