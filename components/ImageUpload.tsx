'use client'
import React from 'react'
import {UploadButton, UploadDropzone} from '@/libs/uploadthing'


interface ImageUploadProps{
    endpoint:'profileImage' | 'textImage',
    oncomplete:(res:string) => void,
    onClose:() => void
}

const ImageUpload = ({endpoint,oncomplete,onClose}:ImageUploadProps) => {
  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res) => {
      oncomplete(res[0].url)
      onClose()
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    }}
  />
  )
}

export default ImageUpload