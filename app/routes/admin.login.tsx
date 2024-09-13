import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  TextField,
  Form,
} from "@shopify/polaris";
import authenticator from "~/admin/auth.server";
import { sessionStorage } from "~/admin/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect : "/admin"
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get("sessionErrorKey");
  return json<any>({ error });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {

  const resp = await authenticator.authenticate("form", request, {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
    throwOnError: true,
    context,
  });

  console.log(resp);
  return resp;

};

export default function Login() {
  const nav = useNavigation();
  const submit = useSubmit();
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const loaderData = useLoaderData();
  const actionData = useActionData();
  console.log(loaderData, actionData)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submitForm = () => {
    console.log("Submitting form...")
    submit({ username: username, password: password }, { method: "POST" })
  }


  return (
    <Page>

      <Card>
        <BlockStack gap="200">
            <Text as="h1" variant="headingMd">Login</Text>
            <TextField
              label="Username"
              autoComplete="off"
              value={username}
              onChange={setUsername}
            />
            <TextField
              label="Password"
              autoComplete="off"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <Button loading={isLoading} onClick={submitForm} >Login</Button>
          </BlockStack>
      </Card>

    </Page>
  );
}
