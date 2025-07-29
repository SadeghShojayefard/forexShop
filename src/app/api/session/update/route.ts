// File: src/app/api/session/update/route.ts
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { NextResponse } from 'next/server';
import Users from '@/lib/models/users';
import dbConnect from '@/lib/db';

export async function GET() {
    try {
        await dbConnect();
        const session = await getServerSession(options);

        if (!session?.user?.username) {
            return NextResponse.json({ status: 'unauthenticated' }, { status: 401 });
        }

        const user = await Users.findOne({ username: session.user.username }).populate('role', 'titleEN');

        if (!user) {
            return NextResponse.json({ status: 'notFound' }, { status: 404 });
        }



        return NextResponse.json({
            status: 'success',
            user: {
                id: user._id.toString(),
                username: user.username,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role?.titleEN,
            },
        });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }
}