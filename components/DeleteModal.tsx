import React from 'react'

interface Props {
    openState: boolean
    setOpenState: any
    initiateDelete: any
}

const DeleteModal = (props: Props) => {
    return (
        <div>
            {props.openState ? (
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-4xl">
                        <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-gray-300 outline-none focus:outline-none">
                            <div className="flex justify-between m-4">
                                <p className="text-slate-800">Are you sure you want to delete this post?</p>
                                <button type="button" onClick={() => props.setOpenState((prev: any) => !prev)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true" className="w-6 h-6 fill-gray-500 hover:fill-gray-600 ml-4">
                                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex justify-center my-4">
                                <button type="button" onClick={() => props.setOpenState((prev: any) => !prev)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    No
                                </button>
                                <button type="button" onClick={() => props.initiateDelete()} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    Yes
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default DeleteModal