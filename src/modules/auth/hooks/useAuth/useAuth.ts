import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/clients/firebase/firebaseConfig";
import ENVIRONMENT from "@/lib/environment";

const ALLOWED_USER_ID = ENVIRONMENT.FIREBASE_ALLOWED_USER_ID;

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.uid === ALLOWED_USER_ID) {
        setUser(currentUser);
        setIsAuthorized(true);
      } else {
        setUser(null);
        setIsAuthorized(false);
        if (currentUser) {
          auth.signOut();
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, isAuthorized };
};

export { useAuth };
