// File: src/app/api/auth/[...nextauth]/options.ts
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import Users from '@/lib/models/users';
import { comparePassword } from '@/helper/sharedFunction';
import dbConnect from '@/lib/db';
import '@/lib/models/roles';

export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { username, password } = credentials;

                await dbConnect();
                const user = await Users.findOne({ username }).populate('role', 'titleEN');
                if (!user) return null;

                const isValid = await comparePassword(password, user.password);
                if (!isValid) return null;

                return {
                    id: user._id.toString(),
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role?.titleEN,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.name = user.name;
                token.email = user.email;
                token.avatar = user.avatar;
                token.role = user.role;
            }

            if (trigger === 'update' && session) {
                token.id = session.id || token.id;
                token.username = session.username || token.username;
                token.name = session.name || token.name;
                token.email = session.email || token.email;
                token.avatar = session.avatar || token.avatar;
                token.role = session.role || token.role;
            }

            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                username: token.username as string,
                name: token.name as string,
                email: token.email as string,
                avatar: token.avatar as string,
                role: token.role as string,
            };
            return session;
        },
    },
};