import { ClassData } from "@/data/assignment";
import { createContext, ReactNode, useState } from "react";

interface AssignmentsProps {
  assignments: ClassData[];
  setAssignments: (assignments: ClassData[]) => void;
}

const AssignmentsContext = createContext<AssignmentsProps | undefined>(
  undefined
);

const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [assignments, setAssignments] = useState<ClassData[]>([]);

  const value = {
    assignments,
    setAssignments,
  };

  return (
    <AssignmentsContext.Provider value={value}>
      {children}
    </AssignmentsContext.Provider>
  );
};

export { AssignmentsProvider, AssignmentsContext };
