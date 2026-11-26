"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function authenticate(
  callbackUrl: string,
  _previousState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    return "Enter your username and password.";
  }

  const safeCallbackUrl =
    callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/meetings";

  try {
    await signIn("credentials", {
      username: username.trim(),
      password,
      redirectTo: safeCallbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "The username or password is incorrect.";
    }
    throw error;
  }

  return undefined;
}
