import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Page from "@/Components/Page";
import { TextField, Stack, Button, Typography } from "@mui/material";
import Swal from "sweetalert2";

const Detail = () => {
  const { query } = useRouter();
  const { code } = query;
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (code) {
      if (code === "new") {
      } else {
        fetch(`https://localhost:7217/api/Products?code=${code}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((result) => setProduct(result));
      }
    }
  }, [code]);
  return (
    <Page title={`Product: ${code !== "new" ? product.name : "New Product"}`}>
      <Stack>
        <Stack>
          <Typography>Code: </Typography>
        </Stack>
        <Stack>
          {" "}
          <TextField
            size="small"
            disabled={code !== "new"}
            onChange={(e) => setProduct({ ...product, code: e.target.value })}
            value={product?.code}
          />
        </Stack>
      </Stack>
      <Stack>
        <Stack>
          <Typography>Name: </Typography>
        </Stack>
        <Stack>
          <TextField
            size="small"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            value={product?.name}
          />
        </Stack>
      </Stack>
      <Stack>
        <Stack>
          <Typography>Price: </Typography>
        </Stack>
        <Stack>
          {" "}
          <TextField
            size="small"
            onChange={(e) => {
              var val = parseFloat(e.target.value);
              setProduct({ ...product, price: val ? val : 0 });
            }}
            value={product?.price}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 1 }}>
        <Stack>
          <Button
            onClick={(e) => {
              Swal.fire({
                title: "Do you want to save the changes?",
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
              }).then((e) => {
                console.log(product)
                if (e.isConfirmed) {
                  fetch(`https://localhost:7217/api/Products?code=${code}`, {
                    method: "POST",
                    headers: {
                      "Accept":"application/json, text/plain, */*",

                      "Content-type":"application/json",
      
                      "Authorization":"*",
      
                      "Access-Control-Allow-Credentials": "true",
      
                      "Access-Control-Request-Method": "*",
      
                      "Access-Control-Allow-Origin":"*",
      
                      "Access-Control-Allow-Headers":"Origin, Content-type, Accept, Authorization, Credentials"
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(product),
                  })
                    .then((response) => response.json())
                    .then((result) => {
                      Swal.fire({
                        title: result.message,

                      })
                    });
                }
              });
            }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
};

export default Detail;
