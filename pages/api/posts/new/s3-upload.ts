import { ddbDocClient } from "@/lib/ddbDocClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export { APIRoute as default } from "next-s3-upload";
