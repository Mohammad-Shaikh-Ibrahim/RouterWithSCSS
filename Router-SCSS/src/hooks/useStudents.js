import { useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";

export function useStudents() {
  return useContext(StudentContext);
}