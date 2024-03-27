import mongoose,{Schema,Document} from "mongoose";

interface Iroom extends Document{
    name:string;
} 

const roomShema= new Schema<Iroom>({
    name:{
        type:String,
        required:true
    }
})

const Roomtype = mongoose.model<Iroom>("roomType",roomShema);

export default Roomtype;

