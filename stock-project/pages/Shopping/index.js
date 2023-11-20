import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Page from "@/Components/Page";
import Swal from "sweetalert2";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`https://localhost:7217/api/Shopping`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);
  return (
    <Page title={"Shopping."}>
      <Stack>
        <Stack>
          <Typography>Search:</Typography>
        </Stack>
        <Stack>
          <TextField
            size={"small"}
            placeholder={"Product Code or Name"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Stack>
      </Stack>
      <Stack sx={{ mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                ?.filter(
                  (f) => f.code.includes(search) || f.name.includes(search)
                )
                ?.map((p, i) => (
                  <TableRow
                    key={p?.code}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{p?.code}</TableCell>
                    <TableCell>{p?.name}</TableCell>
                    <TableCell align="right">{p?.price}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={(e) => {
                          var ex = cart;
                          var s = ex.filter((f) => f.code == p.code)[0];
                          var qty = s ? s.qty + 1 : 0;

                          if (qty <= p.stock) {
                            if (s) {
                              var final = cart.map((x) => {
                                if (x.code == p.code) {
                                  return { ...x, qty: qty };
                                } else {
                                  return { ...x };
                                }
                              });
                              setCart(final);
                            } else {
                              setCart([
                                ...cart,
                                {
                                  code: p.code,
                                  name: p.name,
                                  price: p.price,
                                  qty: 1,
                                },
                              ]);
                            }
                          } else {
                            Swal.fire({
                              title: "จำนวน stock ไม่เพียงพอ",
                            });
                          }
                        }}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack>
        <Typography>Cart</Typography>
      </Stack>
      <Stack>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart?.map((p, i) => (
                <TableRow
                  key={p?.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{p?.code}</TableCell>
                  <TableCell>{p?.name}</TableCell>
                  <TableCell align="right">{p?.price}</TableCell>
                  <TableCell align="right">{p?.qty}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={(e) => {
                        var c = cart.map((x) => {
                          if (x.code == p.code) {
                            return { ...x, qty: x.qty - 1 };
                          } else {
                            return { ...x };
                          }
                        });
                        var final = c.filter((x) => x.qty > 0);
                        setCart(final);
                      }}
                    >
                      -
                    </Button>
                    <Button
                      onClick={(e) => {
                        var final = [];
                        for (var i = 0; i < cart.length; i++) {
                          if (cart[i].code != p.code) {
                            final.push(cart[i]);
                          }
                        }
                        setCart(final);
                      }}
                    >
                      Clear
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack>
        <Button
          onClick={(e) => {
            if (cart.length > 0) {
              Swal.fire({
                title: "Do you want to save the changes?",
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
              }).then((e) => {
                if (e.isConfirmed) {
                  fetch(`https://localhost:7217/api/Shopping`, {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(cart),
                  })
                    .then((response) => response.json())
                    .then((result) => {
                      Swal.fire({
                        title: result.message,
                      }).then(() => {
                        router.push("/Index")
                      });
                    });
                }
              });
            } else {
              Swal.fire({
                title: "โปรดเลือกอย่างน้อย 1 รายการ"
              })
            }
          }}
        >
          Checkout.
        </Button>
      </Stack>
    </Page>
  );
};

export default Index;
