import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/lib/clients/firebase/firebaseConfig";
import type { CreateFoodRequest } from "./types";

const createFood = async (data: CreateFoodRequest): Promise<string> => {
  const foodRef = collection(firestore, "food");

  const docRef = await addDoc(foodRef, {
    ...data,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
};

export { createFood };
