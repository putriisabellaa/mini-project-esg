import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    // Ambil token dari cookie (server-side)
    const cookieStore = cookies();
    const cookieValue = cookieStore.get('token')?.value;

    if (!cookieValue) {
        return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }

    try {
        const response = await fetch('https://mini-project.be.aclasindo.net/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookieValue}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 401 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
