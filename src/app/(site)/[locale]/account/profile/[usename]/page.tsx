"use server"
import UserInfo from "@/components/account/profile/userInfo/UserInfo";
import ChangePassword from "@/components/account/profile/changePassword/ChangePassword";
import ChangeAvatar from "@/components/account/profile/changeAvatar/ChangeAvatar";
import { getUserProfileTranslationData } from "@/data/userProfileTranslationData";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ChangeName from "@/components/account/profile/changeName/ChangeName";

export default async function AccountProfilePage({ params }: { params: { locale: string } }) {
    const { locale } = await params;
    const {
        mainData,
        changePasswordTsData,
        changeAvatarTsData,
        changePasswordValType,
        changeAvatarVal,
        changeNameData,
        changeNameVal
    } = await getUserProfileTranslationData(locale);

    const session = await getServerSession(options);
    return (
        <div className="w-full  flex flex-col justify-start items-center gap-2  text-start  pb-5  ">
            <b className="font-extrabold text-2xl text-black text-shadow-xs text-shadow-black text-start w-full border-b">{mainData.accoutProfile}</b>
            <UserInfo userInfoText={mainData.accountUserInfo}
                emailText={mainData.email} nameText={mainData.nameText} usernameText={mainData.userName} />

            <ChangeName
                username={session?.user.username!}
                name={session?.user.name!}
                translate={changeNameData} valTranslate={changeNameVal}
                locale={locale}
            />

            <ChangePassword
                username={session?.user.username!}
                translate={changePasswordTsData}
                valTranslate={changePasswordValType}
                locale={locale}
            />


            <ChangeAvatar
                username={session?.user.username!}
                translate={changeAvatarTsData} valTranslate={changeAvatarVal}
                locale={locale}
            />
        </div>

    );
}
