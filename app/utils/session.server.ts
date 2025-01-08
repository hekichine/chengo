import { createCookieSessionStorage ,redirect } from "@remix-run/node";

type SessionData = {
  userId: string
  roleId: string
  settings?: string
}
type SessionFlashData = {
  error: string
}
const sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: '__tecibysession',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['teciby'], 
    secure: process.env.NODE_ENV === 'production',
  },
});
export async function createUserSession({
  request,
  userId,
  roleId,
  settings,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  roleId: string;
  settings: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set('userId', userId);
  session.set('roleId', roleId);
  session.set('settings', settings);
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
export async function getRoleId(request: Request){
  const session = await getSession(request);
  const roleId = session.get('roleId');
  return roleId;
}
export async function getSettings(request: Request){
  const session = await getSession(request);
  const settings = JSON.parse(session.get('settings') || '{}');
  return settings;
}
export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}
export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}