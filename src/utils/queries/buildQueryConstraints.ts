import { QueryConstraint, where, orderBy } from "firebase/firestore";

const buildQueryConstraints = (searchQuery?: string): QueryConstraint[] => {
  const constraints: QueryConstraint[] = [];

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    constraints.push(where("nameLowercase", ">=", lowerCaseSearchQuery));
    constraints.push(
      where("nameLowercase", "<=", lowerCaseSearchQuery + "\uf8ff"),
    );
    constraints.push(orderBy("nameLowercase", "asc"));
  } else {
    constraints.push(orderBy("rating", "desc"));
  }

  return constraints;
};

export { buildQueryConstraints };
