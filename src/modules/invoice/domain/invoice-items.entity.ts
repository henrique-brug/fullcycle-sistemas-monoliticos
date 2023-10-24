import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemsProps = {
    id?: Id;
    name: string;
    price: number;
}

export default class InvoiceItems extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemsProps) {
        super(props.id);
        this._name = props.name;
        this._price = props.price;
    }

    public get name(): string {
        return this._name;
    }
    
    public set name(newName: string) {
        this._name = newName;
    }
    
    public get price(): number {
        return this._price;
    }
    
    public set price(newPrice: number) {
        this._price = newPrice;
    }
}