export class InvoiceItems {

    constructor(
        public invoiceItemsID?: number,
        public invoiceID?: number,
        public name?: string,
        public quantity?: number,
        public price?: number,
        public userRegister?: number,
        public dateRegister?: string,
        public userUpdate?: number, // User who updates the record.
        public dateUpdate?: string,

    ) { }


}
