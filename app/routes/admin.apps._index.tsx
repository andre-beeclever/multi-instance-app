import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
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
  DatabaseAddIcon,
  InfoIcon,
  SearchIcon
} from '@shopify/polaris-icons';
import prisma from "~/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/login",
  });

  const apps = await prisma.app.findMany({
    take: 10,
    skip: 0,
    include: {
      shops: true
    }
  })

  return json({ 
    apps
  })
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const json = await request.json()
  
    return json({ 
      
    })
};


export default function AdminApps() {
  const nav = useNavigation();
  const submit = useSubmit();
  const navigate = useNavigate()
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const data = useActionData<typeof action>();
  const { apps } = useLoaderData<typeof loader>()
  return (
    <Page title="Apps" 
    backAction={{
      url: '/admin'
    }}
    primaryAction={{
      content: "Add app",
      icon: DatabaseAddIcon,
      url: "/admin/apps/new"
    }}
    >

      <Card padding={"0"}>
       <IndexTable
        resourceName={{
          singular: "app",
          plural: "apps"
        }}
        itemCount={apps.length}
        selectable={false}
        headings={[
          {title: 'App name'},
          {title: 'App ID'},
          {title: 'Client ID'},
          {title: 'Shops'},
        ]}
      >
        {
          apps.map(
            (
              {name, clientId, clientSecret, id, shops},
              index,
            ) => (
              <IndexTable.Row
                id={name}
                key={name}
                position={index}
                onClick={() => navigate(`/admin/apps/${id}`)}
              >
                <IndexTable.Cell>
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    {name}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{id}</IndexTable.Cell>
                <IndexTable.Cell>{clientId}</IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric>
                    {shops.length}
                  </Text>
                </IndexTable.Cell>
                
              </IndexTable.Row>
            ),
          )
        }
      </IndexTable>
      </Card>

    </Page>
  );
}
