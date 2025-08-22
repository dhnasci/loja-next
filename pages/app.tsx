import { CartProvider } from '../context/CartContext';
import CssBaseLine from '@mui/material/CssBaseline'

export default function App({ Component, pageProps }) {
    return (
        <CartProvider>
            <CssBaseLine />
            <Component {...pageProps} />
        </CartProvider>
    );
}