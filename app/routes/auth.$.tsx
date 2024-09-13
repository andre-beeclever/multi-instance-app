import type { LoaderFunctionArgs } from "@remix-run/node";
import shopify from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const shop: string = String(url.searchParams.get('shop'));
  const authenticate = (await shopify(shop)).authenticate
  
  await authenticate.admin(request);

  return null;
};
