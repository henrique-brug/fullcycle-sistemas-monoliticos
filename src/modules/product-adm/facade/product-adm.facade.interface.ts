import { AddProductInputDto } from './../usecase/add-product/add-product.dto';
export interface AddProductFacadeInputDto {
    id?: string;
    name: string;
    desciption: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStockFacadeInputDto {
    productId: string;
}

export interface CheckStockFacadeOutputDto {
    productId: string;
    stock: number;
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductInputDto): Promise<void>;
    checkStock(
        input: CheckStockFacadeInputDto
        ): Promise<CheckStockFacadeOutputDto>;
}