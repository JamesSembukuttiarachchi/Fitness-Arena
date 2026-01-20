import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  invoiceNumber: {
    type: Number,
    unique: true,
  },
  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
    required: true
  }],
  paymentDate: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to generate a unique 5-digit invoice number
paymentSchema.pre('save', async function(next) {
  try {
    if (!this.isNew) {
      return next();
    }
    const lastPayment = await this.constructor.findOne({}, {}, { sort: { 'createdAt': -1 } });
    let nextInvoiceNumber = 1;
    if (lastPayment) {
      nextInvoiceNumber = lastPayment.invoiceNumber + 1;
    }
    if (nextInvoiceNumber.toString().length > 5) {
      throw new Error("Invoice number exceeded 5 digits");
    }
    this.invoiceNumber = nextInvoiceNumber;
    next();
  } catch (error) {
    next(error);
  }
});

export const Payment = mongoose.model('Payment', paymentSchema);


