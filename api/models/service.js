const mongoose= require('mongoose');

const serviceSchema=new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    arrivalTime: String,
    departureTime: String,
    price: Number,
    mobile:String,

});
const ServiceModel=mongoose.model('service',serviceSchema);

module.exports=ServiceModel;