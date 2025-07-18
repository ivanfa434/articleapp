import { User } from "./user.ts";

interface Payload extends User {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: Payload;
  }
}
