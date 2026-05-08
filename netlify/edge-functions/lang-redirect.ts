import type { Config, Context } from '@netlify/edge-functions';

export default async function handler(request: Request, context: Context) {
  const hostname = new URL(request.url).hostname;
  const target = hostname.includes('syntheticconsciousness') ? '/en/' : '/fr/';
  return Response.redirect(new URL(target, request.url), 302);
}

export const config: Config = {
  path: '/',
};
