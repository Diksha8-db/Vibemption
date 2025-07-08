import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Loader = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center opacity-100 gap-20' >
        <StyledWrapper>
      <div className="spinner">
        <div className="spinner1" />
      </div>
      
    </StyledWrapper>
    <div className='flex flex-col gap-10 items-center'>
        <h1 className='text-white font-semibold text-4xl text-center'> Loading !! Please wait ⏳</h1>
        <Link to='/'
        
        className='font-semibold px-4 py-2 bg-green-400 text-gray-950 rounded-xl hover:bg-transparent hover:border-2 border-green-400 hover:text-green-400'>
        Go Home
        </Link>
      </div>
    </div>
    
  );
}

const StyledWrapper = styled.div`
  .spinner {
    background-image: linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255));
    width: 100px;
    height: 100px;
    animation: spinning82341 1.7s linear infinite;
    text-align: center;
    border-radius: 50px;
    filter: blur(1px);
    box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
  }

  .spinner1 {
    background-color: rgb(36, 36, 36);
    width: 100px;
    height: 100px;
    border-radius: 50px;
    filter: blur(10px);
  }

  @keyframes spinning82341 {
    to {
      transform: rotate(360deg);
    }
  }`;

export default Loader;
