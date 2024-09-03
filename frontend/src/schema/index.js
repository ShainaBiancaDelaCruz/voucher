import * as Yup from "yup";

const CreateVoucherSchema = Yup.object().shape({
  no: Yup.number().required("Number  is required"),
  amount: Yup.string().required("Amount  is required"),
  date: Yup.string().required("Date  is required"),
  address : Yup.string().required('Address is Required'),
  descOfPayment: Yup.string().required("Description of Payment  is required"),
  bankAcc : Yup.string().required('Bank Account is Required'),
  checkNum: Yup.number().required("checkNumber  is required"),
  invoiceNo: Yup.number().required("Invoice  is required"),
  classExp: Yup.number(),
  subclass: Yup.string(),
  preparedBy: Yup.string().required("Prepared By  is required"),
  accounting: Yup.string().required("Accounting  is required"),
  approvedBy : Yup.string().required('Approved By is Required'),
});

const CreateExpenditureSchema = Yup.object().shape({
  classExp: Yup.number().required("Class  is required"),
  subclass: Yup.string()
});

export { CreateVoucherSchema ,CreateExpenditureSchema };
