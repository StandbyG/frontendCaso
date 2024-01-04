
export class Invoice {

    constructor(
        public invoiceID?: number,
        public nameBill?: string,
        public total?: number,
        public taxes?: number,
        public subTotal?: number,
        public date?: string,
        public state?: number,
        public userRegister?: number, //TODO: Is the PK of the user table.
        public dateRegister?: string,
        public userUpdate?: number, // User who updates the record.
        public dateUpdate?: string,

    ) { }

    

}
