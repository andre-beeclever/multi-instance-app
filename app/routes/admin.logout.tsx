import { LoaderFunctionArgs } from "@remix-run/node";
import authenticator from "~/admin/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: "/admin/login" });
};