import Navbar from './Navbar'
import Dropzone from 'react-dropzone'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import axios from 'axios';

export default function App() {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [gotInference, setGotInference] = useState(false);
  const [inference, setInference] = useState("");

  function onDrop(file) {
    const reader = new FileReader();    
    reader.onabort = () => console.log('file reading aborted')
    reader.onerror = () => console.log('file reading failed')
    reader.onload = async () => {
      try{
      const image = reader.result;
      setLoading(true);
      setUploaded(true);
      setImageUrl(image);
      const response=await axios.post('http://localhost:3000/inference', {image:image});
      setLoading(false);
      // const resizedUrl=`${imageType},${Buffer.from(response.data.resizedImage,ArrayBuffer).toString('base64')}`
      setInference(response.data);
      setGotInference(true);
      toast.success("File uploaded successfully");
      }
      catch(error){
          toast.error("Error while getting inference")
          console.log(error)
      }
    }
    reader.readAsDataURL(file[0]);
}

  return (
    <>
      <Navbar />
      {!uploaded && <div className='flex items-center justify-center mt-36 mb-12'>
        <h1 className='m-auto text-4xl font-semibold'>Hi! Upload an image to get it identified!</h1>
      </div>}
      {!uploaded&&<Dropzone onDrop={onDrop} accept={{ 'image/*': ['.jpeg', '.png', '.jpg']}} maxFiles={2}>
        {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()} className='h-[300px] w-5/6 flex justify-center items-center m-auto mt-5 border-2 border-dashed border-gray-400 rounded bg-gray-100'>
            <input {...getInputProps()} />
            <p className='text-2xl text-gray-400'>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
      </Dropzone>}
      {uploaded&&<img className='m-auto max-h-[500px] mt-48' src={imageUrl} alt="uploaded image" />}
      {loading&&<div className='flex justify-center items-center my-10'>
        <p className='text-3xl inline px-5'>Identifying your image...</p>
        <MoonLoader loading={loading} size={30} color={'green'}/>
      </div>}
      {gotInference&&<div className='flex flex-col justify-center items-center my-10 m-auto'>
        <p className='text-3xl inline px-5'>Identified as {inference}</p>
      </div>}
      <Toaster />
    </>
  )
}