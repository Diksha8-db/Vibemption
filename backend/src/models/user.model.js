import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({

    fullName:{
        type: String,
        required: [true, "Please enter your fullname"],
    },
    email:{
        type: String,
        required : true,
        lowercase: true,
        trim : true,
        unique : true,
        match: [/\S+@\S+\.\S+/, "Invalid email address"]
    },
    password:{
        type: String,
        minLength : 8,
        trim: true,
        required: [true, "Password is required"]
    },
    coverImage:{
        type:String,
    },
    refreshToken:{
        type : String,
    },
    favourites: [{
        type : mongoose.Types.ObjectId,
        ref : "Playlist",
    }],
    watchHistory:[{
        playlist:{
            type : mongoose.Types.ObjectId,
            ref : "Playlist",
            required : true
        },
        watchedAt : {
            type : Date,
            default : Date.now,
        }
    }]

},{timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        fullName : this.fullName,
        email : this.email,
        password : this.password
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
        fullName : this.fullName,
        email : this.email,
        password : this.password
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSchema);