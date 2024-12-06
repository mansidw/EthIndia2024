import { useEffect, useState, useContext, createContext } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar, AnonAadhaarProof, useProver } from "@anon-aadhaar/react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [, latestProof] = useProver();
    const [anonAadhaar] = useAnonAadhaar();

    return <DataContext.Provider value={{
        latestProof,
        anonAadhaar
    }}>
        {children}
    </DataContext.Provider>

}

export const useData = () => useContext(DataContext);