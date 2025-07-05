import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlist.model.js";

const addToFavourites = asyncHandler(async(req,res) => {
    const {playlistId} = req.body

    if(!playlistId){
        throw new ApiError(400, "Playlist is required")
    }

    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "User not authenticated");
    }

    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(400, "User not found. Please sign in or register")
    }

    const playlist = await Playlist.findById(playlistId)

    if(!playlist){
        throw new ApiError(400, "Playlist not found")
    }

    if(user.favourites?.includes(playlistId)){
        return res.status(200).json(new ApiResponse(200, "Playlist already added to your favourites"))
    }

    user.favourites.push(playlistId);
    await user.save()
    await user.populate("favourites");

    return res.status(200).json(new ApiResponse(200,"Playlist added to your favourites", user.favourites))

})

const removeFromFavourites = asyncHandler(async(req, res) => {
    const {playlistId} = req.body

    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "User not authenticated");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if(!user.favourites?.includes(playlistId)){
        throw new ApiError(300, "Playlist is not added to your favourites")
    }

    // filter all favourites other than the given playlist id and save the user

    user.favourites = user.favourites.filter(id => id.toString() !== playlistId.toString())

    await user.save()
    await user.populate("favourites");

    return res.status(200).json(new ApiResponse(200, "Playlist removed from favourites", user.favourites))
})

export {addToFavourites, removeFromFavourites}
