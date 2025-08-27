import Link from "next/link";
import { Card, CardMedia, CardContent, CardActionArea, Grid, Typography } from "@mui/material";
import {ProductCardProps} from "../models/ProductCardProps";
import {ReactNode} from "react";

export function ProductCard({ product, apiBaseUrl = "" }: ProductCardProps)  {
    // Ajusta a URL da foto
    let fotoUrl = product.foto;
    if (fotoUrl && !fotoUrl.startsWith("http")) {
        fotoUrl = `${apiBaseUrl}${fotoUrl.startsWith("/") ? "" : "/"}${fotoUrl}`;
    }

    return (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
                <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={fotoUrl}
                            alt={product.nome}
                        />
                        <CardContent>
                            <Typography variant="h6">{product.nome}</Typography>

                            {product.promotionalPrice !== undefined && product.promotionalPrice < product.preco ? (
                                <>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ textDecoration: "line-through" }}
                                    >
                                        R$ {product.preco.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body1" color="error">
                                        R$ {product.promotionalPrice?.toFixed(2)}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="body1">
                                    R$ {product.preco.toFixed(2)}
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </Grid>
    );
}
