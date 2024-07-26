import { useState } from "react";
import "./index.css";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Vite + React + Tailwind CSS</h1>
        <p className="text-xl mt-4">Counter: {count}</p>
        <Button onClick={() => setCount((count) => count + 1)}>
          Increment
        </Button>
      </div>
    </>
  );
}

export default App;
