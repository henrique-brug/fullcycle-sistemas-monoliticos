import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<Invoice> {

    const invoice = await InvoiceModel.create({
        id: input.id.id,
        name: input.name,
        document: input.document,
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        city: input.address.city,
        state: input.address.state,
        zipCode: input.address.zipCode,        
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
        items: input.items.map((item) =>
            new InvoiceItems({
                id: item.id,
                name: item.name,
                price: item.price,
            })
        )
    });
    return new Invoice({
      id: new Id(invoice.id), 
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode, 
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      items: input.items.map((item) => {
          return new InvoiceItems({
              id: item.id,
              name: item.name,
              price: item.price,
          })
      })
    });
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id } });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    return new Invoice({
        id: new Id(invoice.id),
        name: invoice.name,
        document: invoice.document,
        address: new Address({
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
        }),  
        items: invoice.items.map((item) => {
            return new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            })
        }),
        createdAt: invoice.createdAt,
        updatedAt: invoice.createdAt
    });
  }
}