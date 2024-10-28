"use client";

import {
  Paper,
  Typography,
  Stack,
  alpha,
  useTheme,
  Skeleton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/providers/ProductProvider";
import { getdata } from "@/functions/product";
import { getusers } from "@/functions/userdata";

const Factor = ({ factor }) => {
  const theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const {
    productData,
    setProductData,
    totalValue,
    totalprice,
    userData,
    setUserData,
  } = useContext(ProductContext);

  // const products = productData.length || 0;
  const [product, setProduct] = useState(0);

  const { icon: Icon, color, title, value, max = 100 } = factor;

  const [paletteOption, simplePaletteColorOption] = color.split(".");

  const factorColor = theme.palette[paletteOption][simplePaletteColorOption];

  useEffect(() => {
    getdata()
      .then((res) => {
        setProductData(res.data.response);
      })
      .catch((err) => console.log(err));
    getusers()
      .then((res) => {
        setUserData(res.data.response);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userData.length);
  totalValue();

  return (
    <Paper
      sx={{
        transition: "background-color 0.8s",
        "&:hover": {
          bgcolor: "secondary.main",
          color: "grey.100",
          cursor: "pointer",
          "& .iconWrapper": {
            bgcolor: "secondary.light",
          },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack rowGap={3.75} sx={{ py: 2.5, px: 2.5, height: 1 }}>
        <Stack alignItems="center" rowGap={1.25}>
          <Stack
            justifyContent="center"
            alignItems="center"
            className="iconWrapper"
            sx={{
              height: 38,
              width: 38,
              bgcolor: alpha(factorColor, 0.1),
              borderRadius: "50%",
            }}
          >
            <Icon
              sx={[isHovered ? { color: "grey.100" } : { color: factorColor }]}
            />
          </Stack>
          <div className="text-center flex flex-col gap-1">
            <Typography variant="h3">{title}</Typography>
            <Typography className="text-[20px]">
              {title === "Products" ? (
                userData.length == 0 ? (
                  <Skeleton />
                ) : (
                  productData.length
                )
              ) : title === "Value" ? (
                userData.length == 0 ? (
                  <Skeleton />
                ) : (
                  totalprice
                )
              ) : title === "Users" ? (
                userData.length || <Skeleton />
              ) : userData.length == 0 ? (
                <Skeleton />
              ) : (
                value
              )}
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Factor;
