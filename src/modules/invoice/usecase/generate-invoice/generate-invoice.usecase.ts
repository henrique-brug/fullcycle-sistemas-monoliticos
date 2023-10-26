import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate-invoice.usecase.dto';
import InvoiceGateway from "../../gateway/invoice.gateway";
import Id from '../../../@shared/domain/value-object/id.value-object';
import Address from '../../../@shared/domain/value-object/address.value-object';
import Invoice from '../../domain/invoice.entity';
import InvoiceItems from '../../domain/invoice-items.entity';

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const addressProps = {
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
        };

        const invoiceItemsProps = input.items.map((item) => {
            return new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            })
        })

        const props = {
            name: input.name,
            document: input.document,
            address: new Address(addressProps),
            items: invoiceItemsProps,
        };

        const invoice = new Invoice(props);
        this._invoiceRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.total,
        };
    }
}