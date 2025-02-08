import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const response = await fetch('https://mini-project.be.aclasindo.net/api/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Login failed' }, { status: 401 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
