import { Assignment, ClassData } from "@/data/assignment";
import { createContext, ReactNode, useState } from "react";

interface AssignmentsProps {
  assignments: ClassData[];
  setAssignments: (assignments: ClassData[]) => void;
  groupedAssignments: Assignment[];
  setGroupedAssignments: (groupedAssignments: Assignment[]) => void;
}

const AssignmentsContext = createContext<AssignmentsProps | undefined>(
  undefined
);

const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [assignments, setAssignments] = useState<ClassData[]>([]);
  const [groupedAssignments, setGroupedAssignments] = useState<Assignment[]>(
    []
  );

  const value = {
    assignments,
    setAssignments,
    groupedAssignments,
    setGroupedAssignments,
  };

  return (
    <AssignmentsContext.Provider value={value}>
      {children}
    </AssignmentsContext.Provider>
  );
};

export { AssignmentsProvider, AssignmentsContext };
