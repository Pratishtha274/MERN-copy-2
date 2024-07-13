const mongoose = require('mongoose');

const bookingSchema =new mongoose.Schema({
    service: {type:mongoose.Schema.Types.ObjectId,required:true,ref:'service'},
    user: {type:mongoose.Schema.Types.ObjectId,required:true},
    bookingDate: {type:Date,},
    name: {type:String},
    mobile: {type:String},
    addr: {type:String},
    price: Number,
});

const BookingModel = mongoose.model('Booking',bookingSchema);

module.exports = BookingModel;