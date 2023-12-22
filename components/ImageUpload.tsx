'use client'
import React from 'react'
import {UploadButton, UploadDropzone} from '@/libs/uploadthing'


interface ImageUploadProps{
    endpoint:'profileImage' | 'textImage',
    oncomplete:(res:any) => void
}

const ImageUpload = ({endpoint,oncomplete}:ImageUploadProps) => {
  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res) => oncomplete(res)}
    onUploadError={(error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    }}
  />
  )
}

export default ImageUpload