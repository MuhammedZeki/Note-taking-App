import { useEffect, useState } from "react";
import { auth } from "../firebase/fire/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuthListener() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, isLoading };
}
