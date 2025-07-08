import React,{ useState} from 'react'
import EmojiCard from './EmojiCard'
import Loader from '../../ui/Loader.jsx'
import axios from '../../utils/axios.js'
import '../../index.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import About from './About.jsx'
import { usePlaylist } from '../../context/PlaylistContext.jsx';

function Hero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [mood, setMood] = useState({
    inputtedText : '',
  })

  const {setPlaylist} = usePlaylist()

  // sends the fetched emotion
  const sendEmotion = async(event) => {
    setLoading(true)
    event.preventDefault();
    if (!mood.inputtedText.trim()) {
      toast.warn("Please enter how you feel before generating playlist.");
      return;
    }

    try{
      const response = await axios.get('/playlist/fetch-playlist',
        {
          params : {inputtedText : mood.inputtedText}
        }
      );

      const userHistory = await axios.post('/users/add-history', {
        emotionName : mood.inputtedText
      })

      let fetchedData = response.data.data;

      // if fetched from database
      if(Array.isArray(fetchedData)){
        fetchedData = fetchedData[0];
      }

      if(!fetchedData){
        toast.error("No playlist found")
      }

      setPlaylist(fetchedData)
      setLoading(false)
      toast.success('Playlist generated successfully !! ')
      navigate('/playlist-card');

    }
    catch(error){
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }

  return (
    <>
    {loading ? <Loader/> : 
    <section
     id="home"
     className='w-full px-2 py-8'>
        <div className='w-[80%] lg:w-[70%] mx-auto flex flex-col gap-6 md:gap-12'>
            {/* Heading */}
            <div className='pt-[5rem] md:pt-[6rem]'>
                <h1
                className='text-white text-center font-semibold text-4xl md:text-5xl md:font-bold font-poppins heroSection'
                >Let your <span className='text-[#1ed760]'>vibe</span> lead. We'll handle the <span className='text-[#1ed760] text-5xl'>music</span>.</h1>
            </div>
            {/* Input mood and search button */}
            <div className='flex flex-col items-center gap-6 py-10'>
              <h1
              className='text-(--color-primary) text-center text-xl font-medium'
              >Enter how you feel. Let music heal</h1>
              <input
              type="text"
              placeholder="I'm feeling....."
              name="inputtedText"
              onChange={(e) => setMood({...mood, inputtedText : e.target.value})}
              className='text-(--color-secondary) items-center jsutify-center w-full md:w-[80%] px-4 py-2 outline-none rounded-2xl bg-[#1c0f2c]'
              />
              <button
              onClick={sendEmotion}
              className='bg-(--color-primary) px-4 py-2 rounded-4xl text-(--color-blue-900) font-semibold opacity-95 hover:bg-[#261f2f] hover:text-(--color-primary) hover:border-2 hover:border-(--color-primary) cursor-pointer transition-all duration-500 text-[16px]'
              >Generate Playlist</button>
            </div>

            {/* Mood */}
            <div>
                <EmojiCard/>
            </div>
        </div>

        <About/>
    </section>
    }
    </>
    
  )
}

export default Hero