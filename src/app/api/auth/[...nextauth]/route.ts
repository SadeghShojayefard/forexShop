// import NextAuth from "next-auth";
// import { options } from "./options"

// const handler = NextAuth(options);


// export { handler as GET, handler as POST }

import { options } from "./options";
import { AuthOptions, getServerSession } from "next-auth";
import NextAuth from "next-auth";

const handler = NextAuth(options);
export { handler as GET, handler as POST };

export const getSession = () => getServerSession(options);
export const signIn = async (provider: string, data: any) => {
    const { signIn } = await import("next-auth/react");
    return signIn(provider, data);
};


export const auth = () => NextAuth(options); // برای استفاده در server

