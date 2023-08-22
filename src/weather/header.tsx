import { Typography, Box } from "@mui/material";
import { Product } from ".";

export type HeaderProps = { product: Product };

export const Header = ({ product }: HeaderProps) => (
  <Box>
    <Typography component="h1" variant="h4">
      Here&rsquo;s your weather {product}
    </Typography>
  </Box>
);
