import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
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
  DataTable,
  Icon,
  Spinner,
  Banner,
  ExceptionList,
  IndexTable,
  PageActions,
} from "@shopify/polaris";
import authenticator from "~/admin/auth.server";
import {
  AlertTriangleIcon,
  ExternalIcon,
  InfoIcon,
  SearchIcon
} from '@shopify/polaris-icons';
import prisma from "~/db.server";
import { App, Shop } from "@prisma/client";
import { useField, useForm } from "@shopify/react-form";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/login",
  });
  return json({ 
    app: {
      clientId: "",
      clientSecret: "",
      id: "",
      name: "",
      shops: []
    } 
  })
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()
    console.log(form)
    const app = await prisma.app.create({
      data: {
        clientId: String(form.get('clientId')),
        clientSecret: String(form.get('clientSecret')),
        id: String(form.get('id')),
        name: String(form.get('name')),
      }
    })
    return redirect(`/admin/apps/${app.id}`)
};


export default function AdminApp() {
  const nav = useNavigation();
  const submitForm = useSubmit();
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const data = useActionData<typeof action>();
  const { app } = useLoaderData<typeof loader>()
  
  const {
    fields: {
      clientId,
      clientSecret,
      id,
      name,
    },
    dirty,
    submit,
  } = useForm({
      fields: {
        clientId: useField({value: app.clientId, validates: (value) => {
          if(value == ""){
            return "Client ID cant be blank."
          }
        }}),
        clientSecret: useField({value: app.clientSecret, validates: (value) => {
          if(value == ""){
            return "Client Secret cant be blank."
          }
        }}),
        id: useField({value: app.id, validates: (value) => {
          if(value == ""){
            return "App ID cant be blank."
          }
        }}),
        name: useField({value: app.name, validates: (value) => {
          if(value == ""){
            return "App name cant be blank."
          }
        }}),
      },
      onSubmit: async (form) => {

        submitForm(form, { method: "post" });

        return { status: "success" };
      },
  });


  
  return (
    <Page title={"Add a new app"} backAction={{
      url: "/admin/apps",
    }}>
      <BlockStack gap="500">
      <Card>
        <BlockStack gap="300">
          <Text as="h2" variant="headingMd">Client credentials</Text>
          <TextField 
            label="App name" 
            autoComplete="off" 
            requiredIndicator
            { ...name } 
            />
          <TextField 
            label="App ID" 
            autoComplete="off" 
            monospaced
            requiredIndicator
            { ...id }
            />
          <TextField 
            label="Client ID" 
            autoComplete="off" 
            monospaced 
            requiredIndicator
            {...clientId}
            />
          <TextField 
            label="Client secret" 
            autoComplete="off" 
            monospaced 
            requiredIndicator
            {...clientSecret}
            />
        </BlockStack>
      </Card>
      </BlockStack>
      <PageActions
      primaryAction={{
        content: "Save",
        onAction: submit,
        loading: isLoading
      }}
      ></PageActions>
    </Page>
  );
}
