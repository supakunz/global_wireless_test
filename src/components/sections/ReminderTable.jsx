"use client";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import IconifyIcon from "../../components/base/IconifyIcon";
import SearchFilter from "../../components/common/SearchFilter";
import CustomPagination from "../../components/common/CustomPagination";
import { columns, rows } from "../../data/reminderTableData";
import AddProject from "../addproject/AddProject";
import { useContext, useEffect, useState } from "react";
import { getdata } from "@/functions/product";
import { ProductContext } from "@/providers/ProductProvider";
// import EditProduct from "../editproduct/EditProduct";

const ReminderTable = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { setProductData, productData, loading, setLoading } =
    useContext(ProductContext);
  const apiRef = useGridApiRef();

  useEffect(() => {
    getdata()
      .then((res) => {
        setProductData(res.data.response);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data);
  return (
    <>
      <Paper
        sx={(theme) => ({
          p: theme.spacing(2, 4.5),
          width: 1,
        })}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h5" color="common.black">
            Products
          </Typography>

          <SearchFilter apiRef={apiRef} />

          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            color="secondary"
            sx={(theme) => ({
              p: theme.spacing(0.625, 1.5),
              borderRadius: 1.5,
            })}
            startIcon={<IconifyIcon icon="heroicons-solid:plus" />}
          >
            <Typography variant="body2">Add New</Typography>
          </Button>
        </Stack>

        <Box
          sx={{
            height: 480, //*Product Table height*
            width: 1,
            mt: 1.75,
          }}
        >
          <DataGrid
            apiRef={apiRef}
            columns={columns}
            rows={productData} // ** Data from API ** #mockup -> rows
            rowHeight={80}
            // {...data}
            loading={loading} //loading #overlays MUI
            slotProps={{
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
              pinnedColumns: {
                left: ["desk"],
              },
            }}
          />
        </Box>
        <CustomPagination apiRef={apiRef} />
      </Paper>
      <AddProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ReminderTable;
