import React, { useEffect } from 'react'
import { AnonAadhaarProof } from "@anon-aadhaar/react";
import { useData } from '../../context/DataContext';


function Anon() {
    const { anonAadhaar, latestProof } = useData();
    return (
        <div>
            <div >
                {/* Render the proof if generated and valid */}
                {anonAadhaar?.status === "logged-in" && (
                    <>
                        <p>✅ Proof is valid</p>
                        {latestProof && (
                            <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Anon