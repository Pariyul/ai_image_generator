import React, { useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'
import { useRef } from 'react';

const ImageGenerator = () => {

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading]= useState(false);

    const imageGenerator = async ()=>{
        if(inputRef.current.value ===""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            " https://storage.googleapis.com/generativeai-downloads/images/jetpack.jpg",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer AIzaSyB7MR-ku5SqLK6rwzm_zahonlaaN9wdq9E",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
        
    }

  return (
    <div className='ai-image-generator'>
        <div className="header">Ai image <span>generator</span></div>
        <div className="img-loading">
            <div className="image"> <img src={image_url==="/"?default_image:image_url} alt='' /></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?"loading-text":"display-none"}>Loading....</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator