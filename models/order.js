const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        country: String,
        state: String,
        zipcode: {
            type:String,
            required:true
        },
    },
    phone: {
        type: Number,
        required: true,
    },
    productIds:[ // foreign key
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        }
    ],
    createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, {timestamps: true,});

const Order =  mongoose.model('Order', orderSchema);

module.exports = Order;