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
  DatabaseAddIcon,
  ExternalIcon,
  InfoIcon,
  SearchIcon
} from '@shopify/polaris-icons';
import prisma from "~/db.server";
import { App, Shop } from "@prisma/client";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/login",
  });
  if(params.id == "new") return json({ 
    app: {
      clientId: "",
      clientSecret: "",
      id: "",
      name: "",
      shops: []
    } 
  })

  const app = await prisma.app.findUnique({
    where: {
      id: params.id
    },
    include:{
      shops: true
    }
  })

  if(!app) return redirect('/admin/apps')

  return json({ 
    app
  })
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    if(request.method == "DELETE"){
      
      return redirect('/admin/apps')
    }
    return json({ 
      
    })
};


export default function AdminApp() {
  const nav = useNavigation();
  const submit = useSubmit();
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const data = useActionData<typeof action>();
  const { app } = useLoaderData<typeof loader>()
  
  
  return (
    <Page title={app.name} backAction={{
      url: "/admin/apps",
    }}
    secondaryActions={[{
      content:"Open in Shopify Partners",
      url: `https://partners.shopify.com/205325/apps/${app.id}/overview`,
      target: "_blank",
      icon: ExternalIcon
    }
    ]}>
       <BlockStack gap="500">
      <Card>
        <BlockStack gap="300">
          <Text as="h2" variant="headingMd">Client credentials</Text>
          <TextField readOnly label="Client ID" autoComplete="off" monospaced value={app.clientId}/>
          <TextField readOnly type="password" label="Client secret" autoComplete="off" monospaced value={app.clientSecret}/>
        </BlockStack>
      </Card>
      
      <Card padding={"0"}>
        <Box padding={"200"}>
          <InlineStack align="end">
              <Button url={`/admin/apps/${app.id}/shops/new`} variant="tertiary" icon={DatabaseAddIcon}>Add shop</Button>
          </InlineStack>
        </Box>
       <IndexTable
        resourceName={{
          singular: "shop",
          plural: "Shops"
        }}
        itemCount={app.shops.length}
        selectable={false}
        headings={[
          {title: 'Name'},
        ]}
      >
        {
          app.shops.map(
            (
              {name},
              index,
            ) => (
              <IndexTable.Row
                id={name}
                key={name}
                position={index}
              >
                <IndexTable.Cell>
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    {name}
                  </Text>
                </IndexTable.Cell>
                
              </IndexTable.Row>
            ),
          )
        }
      </IndexTable>
      </Card>
      </BlockStack>
      {/* <PageActions
        primaryAction={<Button tone="critical" onClick={() => submit({},{
          method: "DELETE",
        })} variant="primary">Delete</Button>}
      ></PageActions> */}
    </Page>
  );
}
