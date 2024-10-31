import AddFriendButton from '@/app/components/AddFriendButton'
import {FC} from 'react'


const page: FC = ({}) =>{
 return <main className='pt-8'>
 
     <h1 className='font-bold text-5xl mb-8'>Add a Friend</h1>
     <AddFriendButton></AddFriendButton>
 </main>
}

export default page