import { IconType } from "react-icons";
type items = {
    Icon: IconType;
    title: string;
    text: string;
    iconColor: string;

};

const CardItems: React.FC<items> = ({ Icon, title, text, iconColor }) => {
    return (
         <div className='h-full sm:col-span-full md:col-span-1  flex flex-row justify-start  items-center w-full 
          border-2 border-white/30 rounded-2xl m-1 p-2 bg-white/30 backdrop-blur-md shadow-black shadow-xl   ' >
            <div className={`flex flex-row justify-center items-center p-4 text-[50px] `} >
                <Icon className={`${iconColor}   `} />
            </div>
            <div className='flex flex-col justify-start items-start pl-2'>
                <p className='font-bold '>
                    {title}
                </p>
                <p>
                    {text}
                </p>
            </div>

        </div >
    )
}

export default CardItems;
