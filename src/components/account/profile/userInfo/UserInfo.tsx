
import { options } from "@/app/api/auth/[...nextauth]/options";
import { userInfoType } from "@/Type/UserInfoType.type";
import { getServerSession } from "next-auth";
const UserInfo: React.FC<userInfoType> = async ({ userInfoText, nameText, emailText, usernameText }) => {

    const session = await getServerSession(options);

    return (

        <div className="w-full  flex flex-row flex-wrap justify-evenly items-center gap-2  p-2  shadow-xl shadow-black rounded-xl mb-5  ">
            <b className="font-bold text-lg text-black text-shadow-xs text-shadow-black text-start w-full">{userInfoText}</b>

            <div className="flex flex-col justify-center items-center gap-1 ">
                <label className="block text-sm ">{usernameText}</label>
                <input type="text" className="input-style text-center" disabled readOnly defaultValue={session?.user.username} />
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <label className="block text-sm"> {nameText}</label>
                <input type="text" className="input-style text-center" disabled readOnly defaultValue={session?.user.name} />
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <label className="block text-sm"> {emailText} </label>
                <input type="text" className="input-style text-center" disabled readOnly defaultValue={session?.user.email} />
            </div>

        </div>

    );
}
export default UserInfo;