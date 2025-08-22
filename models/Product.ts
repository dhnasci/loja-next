export interface Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    promotionalPrice?: number;
    foto: string;
}