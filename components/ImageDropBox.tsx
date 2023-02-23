import Image from 'next/image';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const ImageDropBox = ({files, setFiles}: any) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Add the files to the files array
        setFiles((current: any) => [...current, ...acceptedFiles])
        console.log("Accepted Files: ", acceptedFiles);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className='bg-gray-300 p-4 rounded my-4 border-2 border-dashed border-gray-400'>
            <div className='grid grid-cols-6'>
                {files.map((file: File, index: number) => {
                    const previewURL = URL.createObjectURL(file);
                    return (
                        <div key={'previewImage'+index} className='rounded p-2 bg-white'>
                            <Image alt={''} src={previewURL} width={200} height={200}/>
                        </div>
                    )
                })}
            </div>
            <input {...getInputProps()} />
            <div className='mt-2 text-center'>
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    )
}

export default ImageDropBox;