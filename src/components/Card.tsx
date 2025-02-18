import {UserType} from "@/types";

function Card({ user, fact }: {user: UserType, fact: string}) {
  const { name, picture } = user;

  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm'>
      <div className='flex items-center gap-4'>
        <img src={picture.thumbnail} alt={`${name.first} ${name.last}`} className='rounded-full w-12 h-12' />
        <h2 className='text-xl font-bold'>{name.first} {name.last}</h2>
      </div>
      <p className=''>{fact}</p>
    </div>
  )
}


export  default Card