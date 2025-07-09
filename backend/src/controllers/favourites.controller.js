import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlist.model.js";

const addToFavourites = asyncHandler(async(req,res) => {
    const {trackId} = req.body

    if(!trackId){
        throw new ApiError(400, "Playlist or track is required")
    }

    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "User not authenticated");
    }

    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(400, "User not found. Please sign in or register")
    }


    if(user.favourites?.includes(trackId)){
        return res.status(200).json(new ApiResponse(200, "Playlist already added to your favourites"))
    }

    user.favourites.push(trackId);
    await user.save()

    return res.status(200).json(new ApiResponse(200,"Track added to your favourites", user.favourites))

})

const removeFromFavourites = asyncHandler(async(req, res) => {
    const {trackId} = req.body

    if(!trackId){
        throw new ApiError(400, "Track ID is required")
    }

    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "User not authenticated");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if(!user.favourites?.includes(trackId)){
        throw new ApiError(300, "Track is not added to your favourites")
    }

    // filter all favourites other than the given playlist id and save the user

    user.favourites = user.favourites.filter(id => id.toString() !== trackId.toString())

    await user.save()

    return res.status(200).json(new ApiResponse(200, "Playlist removed from favourites", user.favourites))
})

const userFavourites = asyncHandler(async(req, res) => {
    const userId = req.user?._id

    if(!userId){
        throw new ApiError(400, "User not found");
    }

    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(400, "User is not authenticated")
    }

    const userFav = user.favourites;


    const playlists = await Playlist.find({
        "tracks._id" : {
            $in : userFav
        }
    })


    const favTracks = [];

    playlists.forEach(playlist => {
        playlist.tracks.forEach(track => {
            if(userFav.includes(track._id.toString())){
                favTracks.push(track)
            }
        })
    })

    return res.status(200).json(new ApiResponse(200, "Fetched successfully!!", favTracks))
})
export {addToFavourites, removeFromFavourites, userFavourites}
