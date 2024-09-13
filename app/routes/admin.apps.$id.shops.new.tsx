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
    shop: {
      name: "",
      appId: params.id
    },
    
  })
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const form = await request.formData()

    const shop = await prisma.shop.create({
      data: {
        name: String(form.get('name')),
        appId: String(params.id)
      },
    })
    return redirect(`/admin/apps/${params.id}`)
};


export default function AdminApp() {
  const nav = useNavigation();
  const submitForm = useSubmit();
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const data = useActionData<typeof action>();
  const { shop } = useLoaderData<typeof loader>()
  
  const {
    fields: {
      name,
    },
    dirty,
    submit,
  } = useForm({
      fields: {
        name: useField({value: shop.name, validates: (value) => {
          if(value == ""){
            return "Shop name can't be blank."
          }
          if(!value.includes(".myshopify.com")){
            return "Shop name must be a .myshopify.com domain"
          }
        }}),
      },
      onSubmit: async (form) => {

        submitForm(form, { method: "post" });

        return { status: "success" };
      },
  });


  
  return (
    <Page title={"Add a new shop"} backAction={{
      url: `/admin/apps/${shop.appId}`,
    }}>
      <BlockStack gap="500">
      <Card>
        <BlockStack gap="300">
          <Text as="h2" variant="headingMd">Client credentials</Text>
          <TextField 
            label="Shop name" 
            autoComplete="off" 
            helpText="<shop>.myshopify.com"
            requiredIndicator
            { ...name } 
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
