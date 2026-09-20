"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

type AuthFormState = {
  error?: string;
};

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Name must be at least 2 characters long."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z.string().trim().min(10, "Enter a valid phone number.").max(15),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[a-zA-Z]/, "Password must include at least one letter.")
      .regex(/[0-9]/, "Password must include at least one number."),
    confirmPassword: z.string(),
  })
  .refine((input) => input.password === input.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export async function registerWithCredentials(
  _state: AuthFormState | undefined,
  formData: FormData,
): Promise<AuthFormState | undefined> {
  const callbackUrl = (formData.get("callbackUrl") as string | null) ?? "/account";

  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid registration data." };
  }

  const email = parsed.data.email.toLowerCase();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone: parsed.data.phone }],
    },
    select: { id: true },
  });

  if (existingUser) {
    return { error: "User with this email or phone already exists." };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.user.create({
    data: {
      name: parsed.data.fullName,
      email,
      phone: parsed.data.phone,
      passwordHash,
      role: "USER",
    },
  });

  try {
    await signIn("credentials", {
      email,
      password: parsed.data.password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Registration succeeded but auto-login failed. Please login manually." };
    }

    throw error;
  }
}

export async function loginWithCredentials(
  _state: AuthFormState | undefined,
  formData: FormData,
): Promise<AuthFormState | undefined> {
  const callbackUrl = (formData.get("callbackUrl") as string | null) ?? "/account";

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid login data." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }

    throw error;
  }
}

export async function loginWithGoogle(formData: FormData) {
  const callbackUrl = (formData.get("callbackUrl") as string | null) ?? "/account";
  await signIn("google", { redirectTo: callbackUrl });
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}
