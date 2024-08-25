import mongoose, {Schema,model} from "mongoose";
const dishavailschema=new Schema({
  name:String,
  price:Number
})
const schema = new Schema({
  cname:String,
  caddress:String,
  ph:String,
  email:String,
  dish:String,
  password:String,
  count:Number,
  dish:[
    dishavailschema
  ]
})
export default model("Cater",schema)


