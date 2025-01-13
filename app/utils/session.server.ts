import { createCookieSessionStorage ,redirect } from "@remix-run/node";

type SessionData = {
  userId: string
  email?: string | undefined
}
type SessionFlashData = {
  error: string
}
const sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: '__Chengosession',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['Chengo'], 
    secure: process.env.NODE_ENV === 'production',
  },
});
export async function createUserSession({
  request,
  userId,
  email,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  email: string | undefined;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set('userId', userId);
  session.set('email', email);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}


export async function getSession(request: Request){
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

export async function getUserId (request: Request){
  const session = await getSession(request);
  const userId = session.get('userId');
  return userId;
}

export async function getUserEmail (request: Request){
  const session = await getSession(request);
  const email = session.get('email');
  return email;
}
export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/signin?${searchParams}`);
  }
  return userId;
}
export async function signout(request: Request) {
  const session = await getSession(request);
  // console.log(session)
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}