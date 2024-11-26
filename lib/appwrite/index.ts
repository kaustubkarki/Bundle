"use server";

import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

//! Initializes the Appwrite Client and configures it with the endpointUrl and projectId from appwriteConfig.
export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  //!Fetches the appwrite-session cookie from the incoming request using next/headers.
  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value)
    throw new Error("No session available, Please Login in");

  client.setSession(session.value);

  //! returns an object with convenient getters for interacting with Appwrite's Account and Databases services.
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

//!Initializes the Appwrite Client and configures it with the endpointUrl and projectId from appwriteConfig
export const createAdminClient = async () => {
  //!Authenticates the client with an API key using client.setKey(appwriteConfig.secretKey).
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  //!Returns an object with getters for interacting with Appwrite's Account, Databases, Storage, and Avatars services.
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
//
