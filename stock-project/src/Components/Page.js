import { Container } from "@mui/system";
import { Stack, Typography, Link } from "@mui/material";
import { useRouter } from "next/router";

const Page = ({ title, children }) => {
  const router = useRouter();
  return (
    <Container>
      <Stack
        sx={{ width: "100%", justifyContent: "space-between", flexDirection: "row", pb: 2, borderBottom: "1px black solid" }}
      >
        <Stack>
          <Typography>{title}</Typography>
        </Stack>
        <Stack alignItems={"right"}>
          <Link href={`/Index`}>Back to Index</Link>
        </Stack>
      </Stack>
      <Stack sx={{ pt: 2 }}>{children}</Stack>
    </Container>
  );
};

export default Page;
