import { auth } from "@/lib/clients/firebase/firebaseConfig";

import { signOut } from "firebase/auth";

const logout = async (): Promise<void> => {
  await signOut(auth);
};

export { logout };
