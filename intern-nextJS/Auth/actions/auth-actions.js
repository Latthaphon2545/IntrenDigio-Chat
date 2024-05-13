"use server";

import { createAuthSession, destroyAuthSession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Email must be valid";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (e) {
    if (e.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email = "Email already exists can not create account";
      return { errors };
    }
    throw e;
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: { email: "No user found with this email or Incorrect password" },
    };
  }

  const hashedPassword = verifyPassword(existingUser.password, password);

  if (!hashedPassword) {
    return {
      errors: { email: "No user found with this email or Incorrect password" },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  } else {
    return signup(prevState, formData);
  }
}

export async function logout() {
  await destroyAuthSession();
  redirect("/");
}
