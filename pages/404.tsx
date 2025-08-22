import { Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
    return (
        <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography variant="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Página não encontrada
            </Typography>
            <Link href="/" passHref legacyBehavior>
                <Button variant="contained" color="primary">
                    Voltar para a Home
                </Button>
            </Link>
        </Box>
    );
}