import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
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
} from "@shopify/polaris";
import authenticator from "~/admin/auth.server";
import {
  AlertTriangleIcon,
  InfoIcon,
  SearchIcon
} from '@shopify/polaris-icons';
import prisma from "~/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/login",
  });

  return json({ 
    
  })
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const json = await request.json()
  
    return json({ 
      
    })
};


export default function AdminIndex() {
  const nav = useNavigation();
  const submit = useSubmit();
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const data = useActionData<typeof action>();
  return (
    <Page title="Multi Instance App Admin" secondaryActions={[{
      content:"Logout",
      url: "/admin/logout"
    }
    ]}>

      <Card>
      </Card>

    </Page>
  );
}
