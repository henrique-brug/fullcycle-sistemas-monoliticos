import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.respository";
import Address from "../../@shared/domain/value-object/address.value-object";

describe("InvoiceRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 15
        })
        
        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 85
        })
        
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "37974943866",
            address: new Address({
                street: "Street 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1",
                state: "SP",
                zipCode: "11111-111"
            }),
            items: [invoiceItem1, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const findInvoice = await repository.find(invoice.id.id);

        expect(invoice.id.id).toEqual(findInvoice.id.id),
        expect(invoice.items.length).toBe(findInvoice.items.length),
        expect(invoice.name).toEqual(findInvoice.name);
    })

    it("should find a invoice", async () => {

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 15,
        })
        
        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 85,
        })
                
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "37974943866",
            address: new Address({
                street: "Street 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1",
                state: "SP",
                zipCode: "11111-111",
            }),
            items: [invoiceItem1, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const findInvoice = await repository.find(invoice.id.id);

        expect(findInvoice.id.id).toEqual(invoice.id.id);
        expect(findInvoice.items.length).toBe(invoice.items.length);
    })
})