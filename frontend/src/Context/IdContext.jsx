import { createContext, useState } from "react";

export const datacontext = createContext(null);

// ✅ Add `export default`
export default function IdContextProvider(props) {
  const [idg, setidg] = useState(0);

  return (
    <datacontext.Provider value={{ idg, setidg }}>
      {props.children}
    </datacontext.Provider>
  );
}
