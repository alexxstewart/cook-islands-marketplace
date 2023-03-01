import React from "react";
import { ddbDocClient } from "@/lib/ddbDocClient";
import { DeleteItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import noImage from '../../../public/no_image.jpg';
import { useUser } from "@auth0/nextjs-auth0/client";
import Comment from "@/components/Comment";
import DeleteModal from "@/components/DeleteModal";
import Router from 'next/router'
import Loading from "@/components/Loading";

export async function getServerSideProps({ params }:any) {
    // Fetch the post with the postID in the params

    const importData = await ddbDocClient.send(new ScanCommand({ 
        FilterExpression: "contains (postID, :postid)",
        ExpressionAttributeValues: {
          ":postid": { S: params.postID },
        },
        // ProjectionExpression: "ownedBy",
        TableName: "Posts",
    }));

    return {
        props: { item: importData.Items![0] }
    }
}

const Post = ({ item }: any) => {

    const { user, error, isLoading } = useUser();

    const [deleteConfirmationOpenState, setDeleteConfirmationOpenState] = React.useState(false);
    const [deleteLoadingState, setDeleteLoadingState] = React.useState(false);

    const [comments, setComments] = React.useState<any[]>([]);
    const [newComment, setNewComment] = React.useState('');
    const [showComments, setShowComments] = React.useState(false);

    const [postUser, setPostUser] = React.useState<any>(null);

    let image = '/../../public/car.jpg';
    if (item.image_urls) image = item.image_urls.L[0].S;

    const initiateDelete = async () => {
        setDeleteConfirmationOpenState(false);
        setDeleteLoadingState(true);
        const result = await axios.delete(`/api/posts/${item.postID.S}`)
        console.log("DELETE RESULT: ", result);
        if (result.status === 200) {
            Router.push('/');
        }
        setDeleteLoadingState(false);
    }

    const getUser = async () => {
        if (item.userID) {
            const getStatus = await axios.get(`/api/users/${item.userID.S}`);
            if (getStatus.status === 200) {
                setPostUser(getStatus.data);
            }
        }
    }

    const getComments = async () => {
        const getStatus = await axios.get(`/api/posts/${item.postID.S}/comments`);
        if (getStatus.status === 200) {
            setComments(getStatus.data.items);
        }
    }

    const submitNewComment = async () => {
        if (user) {
            const submitStatus = await axios.post(`/api/posts/${item.postID.S}/comments`, {comment: newComment, userID: user.sub});
            if (submitStatus.status === 200) { // Comment added successfully
                setComments(current => [...current, {comment: newComment}]);
                setNewComment(''); // Clear the comment text
            }
        }
    }

    React.useEffect(() => {
        getComments();
        getUser();
    }, [])

    return (
        <div className="rounded p-4 bg-gray-200 max-w-xl min-w-lg mx-auto my-20 shadow-lg shadow-slate-800">

            <DeleteModal openState={deleteConfirmationOpenState} setOpenState={setDeleteConfirmationOpenState} initiateDelete={initiateDelete}/>

            <Loading state={deleteLoadingState}/>

            <div className="my-2">
                <p className="text-3xl my-auto"><strong>{item.productName ? item.productName.S : ''}</strong></p>
                <p className="text-xl my-auto text-gray-600">{item.price ? item.price.S : ''}</p>
            </div>

            <Carousel>
                {item.image_urls ? item.image_urls.L.map((item: any, index: number) => {
                    return (
                        <div key={'image'+index}>
                            <Image width={2000} height={2000} src={item.S} alt="..."/>
                        </div>
                    )
                }) : (
                    <div>
                        <Image src={'/../public/no_image.jpg'} alt={'No image'} width={500} height={500}/>
                    </div>
                )}
            </Carousel>

            <div className="flex justify-between">
                <p className='text-lg text-gray-600'>{item.description ? item.description.S : ''}</p>
            </div>

            <div className="border h-0.5 border-gray-300 my-2"></div>

            <div className="flex justify-between">
                {postUser ? (
                    <div className="flex justify-start my-4">
                        <div className="my-auto">
                            <Image src={postUser.image_url ? postUser.image_url : noImage} alt={''} width={40} height={40} className='object-cover rounded-full max-w-10 max-h-10 shadow-xl'/>
                        </div>
                        <div className="ml-2 my-auto">
                            <p className="text-md">{postUser.first_name ? postUser.first_name : ''} {postUser.last_name ? postUser.last_name : ''}</p>
                            <div className="flex justify-start">
                                <div className="flex justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 my-auto mr-2 fill-slate-400">
                                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/>
                                    </svg>
                                    <p className="text-sm text-slate-500">{postUser.phone_number ? postUser.phone_number : '-'}</p>
                                </div>
                                <div className='flex justify-start mx-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 my-auto mr-2 fill-slate-400">
                                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                                    </svg>
                                    <p className="text-sm text-slate-500">{postUser.email ? postUser.email : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-300 my-4">No user...</p>
                )}
                <div className='flex justify-right my-auto'>
                    <div className='flex justify-right'>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 m-auto" fill="currentColor" viewBox="0 0 512 512">
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                            </svg>
                            <p className="ml-2">Edit</p>
                        </button>
                        <button onClick={() => setDeleteConfirmationOpenState(true)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-3 h-3 m-auto" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>
                            <p className="ml-2">Delete</p>
                        </button>
                    </div>
                </div>
            </div>

            <div onClick={() => setShowComments(prev => !prev)} className='p-2 flex justify-between mt-6 hover:bg-gray-300 rounded'>
                <p className='text-gray-500'>Comments</p>
                {showComments ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 my-auto fill-gray-500">
                        <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                    </svg>
                ): (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 my-auto fill-gray-500">
                        <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                    </svg>
                )}
            </div>

            {showComments && (
                <div>
                    <div>
                        {comments.map((comment: any, index: number) =>  <Comment key={'comment'+index} comment={comment}/>)}
                    </div>

                    <div className='w-full flex justify-center mt-3'>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            className='mx-1 shadow border border-slate-300 bg-slate-200 w-full rounded px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                            value={newComment}
                            onChange={(event: any) => setNewComment(event.target.value)}
                        />
                        <button type="button" onClick={submitNewComment} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                            Submit
                        </button>
                    </div>
                </div>
            )}




        </div>
    )
}

export default Post