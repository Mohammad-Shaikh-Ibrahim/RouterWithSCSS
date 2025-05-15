import { createContext} from "react";
import { studentsData } from "../utils/data";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  return (
    <StudentContext.Provider value={studentsData}>
      {children}
    </StudentContext.Provider>
  );
}


