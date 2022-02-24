const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique :true,
    },
    password :{
        type:String,
        required:true,
    },
    name :{
        type:String,
        required:true,
        
    },
    avatar : {
           type :String,

    },
    Friends : [{
        type :mongoose.Schema.Types.ObjectId,
        ref :'Friends',
    }]

},{
    timestamps:true,
})

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
});
UserSchema.statics.uploadedAvatar=multer({storage :  storage}).single('avatar');
UserSchema.statics.avatarpath=AVATAR_PATH;
const User=mongoose.model('User',UserSchema);

module.exports=User;