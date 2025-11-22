import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/clients/firebase/firebaseConfig";
import ENVIRONMENT from "@/lib/environment";

import type { LoginRequest, LoginResponse } from "./types";

const ALLOWED_USER_ID = ENVIRONMENT.FIREBASE_ALLOWED_USER_ID;

const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const userId = userCredential.user.uid;

    if (userId !== ALLOWED_USER_ID) {
      await auth.signOut();
      return {
        success: false,
        error:
          "Usuario no autorizado. Por favor, verifica tu correo y contraseña.",
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al iniciar sesión";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export { login };
