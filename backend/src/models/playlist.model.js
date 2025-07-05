import mongoose,{Schema} from 'mongoose'

const playlistSchema = new Schema({

    title : {
        type : String,
        required : true
    },
    source : {
        type : String,
        required : true,
    },
    link : {
        type : String,
        required : true
    },
    emotion : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String
    },
    tracks : [
        {
            title : String,
            channelTitle : String,
            thumbnail : String,
            link : String,
        }
    ]

},{timestamps: true})

export const Playlist = mongoose.model("Playlist", playlistSchema)