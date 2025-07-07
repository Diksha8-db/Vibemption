import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const fetchPlaylist = asyncHandler(async (req, res) => {
  const { inputtedText } = req.query;

  if (inputtedText?.trim() === "") {
    throw new ApiError(400, "Some input is required to generate playlist");
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const mood = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyse the mood of the the text : ${inputtedText} and give a answer of one word from the following : happy,sad, focussed, reflective,chill, relaxed, energetic, angry`,
    });

    const fetchedMood = mood.text;

    if (fetchedMood?.trim().toLowerCase() === "") {
      throw new ApiError(500, "Unable to process your mood . Please try later");
    }

    const playlistInDB = await Playlist.find({
      emotion: fetchedMood,
    });

    if (playlistInDB?.length !== 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Playlist Fetched successfully !!", playlistInDB)
        );
    }

    // now if the playlist is not present in data base we will fetch from youtube and then store in db and simultaneously give it to the user

    const ytResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          type: "playlist",
          q: `${fetchedMood} song playlist`,
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const playlistItem = ytResponse.data.items[0];
    const playlistId = playlistItem?.id?.playlistId;

    if (!playlistId) {
      return res.status(404).json({ error: "No playlist found" });
    }

    const videoResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: "snippet",
          playlistId: playlistId,
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const playlistLink = `https://www.youtube.com/playlist?list=${playlistId}`;

    const playlistTitle = playlistItem.snippet.title;

    const playlistThumbnail = playlistItem.snippet.thumbnails?.medium?.url;

    const tracks = videoResponse.data.items.map((item) => ({
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.medium?.url,
      link: `https://www.youtube.com/watch?v=${item.snippet.resourceId?.videoId}`,
    }));

    // got the video object

    // now save it to DB
    const newPlaylist = await Playlist.create({
      title: playlistTitle,
      source: "Youtube",
      link: playlistLink,
      emotion: fetchedMood,
      thumbnail: playlistThumbnail,
      tracks,
    });

    res.status(200).json(new ApiResponse(200, "Fecthed data", newPlaylist));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Unable to process the request currently!"));
  }
});


export { fetchPlaylist };
