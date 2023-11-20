import React from "react";
import { Stack, Link } from "@mui/material";
import { useRouter } from "next/router";
import { Container } from "@mui/system";

const Home = () => {
  const router = useRouter()

  return (
    <Container>
      <Stack>
        <Link href={"/Products"}>Products</Link>
      </Stack>
      <Stack>
        <Link href={"/Stock"}>Stock</Link>
      </Stack>
      <Stack>
        <Link href={"/Shopping"}>Shopping</Link>
      </Stack>
    </Container>
  )
};

export default Home;
