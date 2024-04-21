import mongoose from 'mongoose';

const deliverySchema = mongoose.Schema({
  // userId: {
  //   type: String,
  //   required: true
  // },
  // country: {
  //   type: String,
  //   required: true
  // },
  
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true

  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  
});

export const Delivery = mongoose.model('Delivery', deliverySchema);

