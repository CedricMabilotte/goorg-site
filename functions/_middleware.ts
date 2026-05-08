interface Env {}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const hostname = url.hostname;

  if (url.pathname !== '/') return context.next();

  const isEnDomain = hostname.includes('syntheticconsciousness');
  const target = isEnDomain ? '/en/' : '/fr/';
  return Response.redirect(new URL(target, context.request.url), 302);
};
