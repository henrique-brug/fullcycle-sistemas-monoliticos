import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductInputDto } from "../usecase/add-product/add-product.dto";
import ProductAdmFacadeInterface, { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._addUsecase = useCaseProps.addUseCase;
        this._checkStockUsecase = useCaseProps.stockUseCase;
    }

    addProduct(input: AddProductInputDto): Promise<void> {
        // caso o dto do caso de uso for != do dto da facade, 
        // converter o dto do caso de uso
        return this._addUsecase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }

}