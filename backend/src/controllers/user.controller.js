import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import upload from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { application } from "express";

const generateAccessAndRefreshToken = async(userId) => {
  try{
  const currentUser = await User.findById(userId)
  const accessToken = currentUser.generateAccessToken()
  const refreshToken = currentUser.generateRefreshToken()

  currentUser.refreshToken = refreshToken
  await currentUser.save({validateBeforeSave : false})

  return {accessToken, refreshToken}
  }
  catch(error){
    throw new ApiError(
      500,
      "Sorry for incovinience. Unable to generate access and refresh token"
    )
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const isUserPresent = await User.findOne({ email });

  if (isUserPresent) {
    throw new ApiError(400, "User with email already exists. Please Login !!");
  }

  let coverImageUrl = "";
  if (req.file?.path) {
    const uploadedImage = await upload(req.file.path);
    coverImageUrl = uploadedImage?.url || "";
  }

  // Create user
  const user = await User.create({
    fullName,
    email,
    password,
    coverImage: coverImageUrl,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong. Please try later");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new ApiResponse(201, "Registered successfully", {
            user : createdUser,
            accessToken,
            refreshToken
}));
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    [email, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are mandatory");
  }

  const existedUser = await User.findOne({ email }).select("-refreshToken");

  if (!existedUser) {
    throw new ApiError(404, "User doesn't exist.Please sign up !!");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(
    password,
    existedUser.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existedUser._id)

  const loggedInUser = await User.findById(existedUser._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new ApiResponse(201, "Logged in successfully", {
            user : loggedInUser,
            accessToken,
            refreshToken
          }));
});

const logoutUser = asyncHandler(async(req,res) => {
   await User.findByIdAndUpdate(
    req.user._id,
    {
      $set : {
        refreshToken : undefined
      }
    },
    {
      new : true
    }
   )

   const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));

})

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newrefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", newaccessToken)
      .cookie("refreshToken", newrefreshToken)
      .json(
        new ApiError(
          200,
          {
            accessToken,
            refreshToken: newrefreshToken,
          },
          " Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateUser = asyncHandler(async(req,res) => {
  const {fullName, email} = req.body

  const updateData = {}

  if (typeof fullName === "string" && fullName !== "") {
    updateData.fullName = fullName;
  }

  if(email?.trim() !== ""){
    updateData.email = email?.trim();
  }

  if(Object.keys(updateData).length === 0){
    throw new ApiError(400, "At least one field is required to be updated")
  }

  const updatedUserDetails = await User.findByIdAndUpdate(req.user?._id,{
    $set : updateData
  },
  {
    new : true
  }
).select("-password")

 return res.status(200).json(new ApiResponse(200, "User details updated successfully", updatedUserDetails))
})

const updateCoverImage = asyncHandler(async(req,res) => {

  const coverImageLocalPath = req.file?.path

  console.log(coverImageLocalPath)

  if(!coverImageLocalPath){
    throw new ApiError(400, "Cover image is not uploaded")
  }

  const coverImage = await upload(coverImageLocalPath)

  console.log("coverImage " , coverImage)

  if(!coverImage.url){
    throw new ApiError(400, "Failed to upload cover image")
  }

  console.log("coverimage url", coverImage.url)

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set : {
        coverImage : coverImage.url
      },
    },
    { new : true }
  ).select("-password")

  console.log(user)

    return res.status(200).json(new ApiResponse(200, "Cover Image updated successfully", user))
})

export { registerUser, loginUser, logoutUser,getCurrentUser, updateUser, updateCoverImage, refreshAccessToken };
