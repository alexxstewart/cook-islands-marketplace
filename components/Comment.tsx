import React from 'react';
import axios from 'axios';
import noImage from '../public/no_image.jpg';
import Image from 'next/image';
import { format, fromUnixTime } from 'date-fns';

interface Props {
    comment: any
}

const Comment = (props: Props) => {

    const [loadingState, setLoadingState] = React.useState(false);
    const [user, setUser] = React.useState<any>();
    const [date, setDate] = React.useState<Date | null>(null);

    const getUser = async () => {
        if(props.comment.userID){
            setLoadingState(true);
            const res = await axios.get(`/api/users/${props.comment.userID}`);
            if (res.data) setUser(res.data);
            setLoadingState(false);
        }
    }

    React.useEffect(() => {
        getUser();

        // Convert the date 
        if (props.comment.date) {
            const d = new Date(0); 
            d.setUTCSeconds(0, Number(props.comment.date));
            setDate(d);
        }
    }, [])

    return (
        <div className='my-2'>
            <div className='flex justify-start'>
                <Image src={user ? user.image_url ? user.image_url : noImage : noImage} alt={''} width={40} height={40} className='object-cover rounded-full max-w-10 max-h-10 mr-1 shadow-lg'/>
                <div className='bg-gray-300 rounded p-1 mx-1 w-full px-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm'><strong>{user ? user.first_name + ' ' + user.last_name : 'Anonymous'}</strong></p>
                        <p className='text-xs text-gray-500'>{date ? format(date, 'do MMM, yyyy h:mm aaa') : ''}</p>
                    </div>
                    <p className='text-sm text-gray-500'>{props.comment.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment