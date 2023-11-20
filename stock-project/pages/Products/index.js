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

const Index = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`https://localhost:7217/api/Products`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProducts(result);
      });
  }, []);
  return (
    <Page title={"Setup Products."}>
      <Stack>
        <Stack>
          <Stack>
            <Button onClick={(e) => router.push(`/Products/Detail?code=new`)}>
              Create New
            </Button>
          </Stack>
        </Stack>
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
      <Stack>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                ?.filter((f) => f.code.includes(search))
                ?.map((p, i) => (
                  <TableRow
                    key={p?.code}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={(e) => {
                      router.push(`/Products/Detail?code=${p.code}`);
                    }}
                  >
                    <TableCell>{p?.code}</TableCell>
                    <TableCell>{p?.name}</TableCell>
                    <TableCell align="right">{p?.price}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Page>
  );
};

export default Index;
