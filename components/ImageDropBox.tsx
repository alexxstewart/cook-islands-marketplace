import Image from 'next/image';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const ImageDropBox = ({files, setFiles}: any) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Add the files to the files array
        setFiles((current: any) => [...current, ...acceptedFiles])
        console.log("Accepted Files: ", acceptedFiles);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
        }
    })

    return (
        <div {...getRootProps()} className='bg-gray-300 p-4 rounded my-4 border-2 border-dashed border-gray-400'>
            <div className='grid grid-cols-6'>
                {files.map((file: File, index: number) => {
                    const previewURL = URL.createObjectURL(file);
                    return (
                        <div key={'previewImage'+index} className='rounded p-2 bg-white mx-2'>
                            <Image alt={''} src={previewURL} width={200} height={200}/>
                        </div>
                    )
                })}
            </div>

            {files.length === 0 && ( 
                <div>
                    <Image className='mx-auto rounded' alt={''} src={'no_image.jpg'} width={100} height={100}/> 
                </div>
            )}

            <input {...getInputProps()}/>
            <div className='mt-2 text-center'>
                {
                    isDragActive ?
                    <p className='text-slate-600'>Drop the images here ...</p> :
                    <p className='text-slate-600'>Drag `n` drop some images here, or click to select images</p>
                }
            </div>
        </div>
    )
}

export default ImageDropBox;