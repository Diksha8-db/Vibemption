import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const addWatchHistory = asyncHandler(async(req, res) => {
    const {playlistId} = req.body

    if(!playlistId){
        throw new ApiError(400, "Playlist ID is required")
    }

    const userId = req.user?._id

    if(!userId){
        throw new ApiError(400, "User is not authenticated")
    }

    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(400, "User not found")
    }

    user.watchHistory = user.watchHistory.filter(
        (entry) => entry.playlist.toString() !== playlistId.toString()
    );

    user.watchHistory.unshift(
        {
            playlist : playlistId,
        }
    )

    // adds only the first 20 to the watch history
    if(user.watchHistory?.length > 20){
        user.watchHistory = user.watchHistory.slice(0,20)
    }

    await user.save();

    res.status(200).json(
        new ApiResponse(200, "Watch history updated successfully", user.watchHistory)
    )
})

const getWatchHistory = asyncHandler(async(req, res) => {
    const userId = req.user?._id

    if(!userId){
        throw new ApiError(400, "User not found")
    }

    const user = await User
                        .findById(userId)
                        .populate("watchHistory.playlist")
                        .select("watchHistory")

    if(!user){
        throw new ApiError(400, "User not found")   
    }

    res.status(200).json(new ApiResponse(200, "Watch history fetched successfully", user.watchHistory))

})

export {addWatchHistory, getWatchHistory}