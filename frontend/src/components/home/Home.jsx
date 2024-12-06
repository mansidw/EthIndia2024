import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';

function Home() {
    const { getUnlockTime, withdrawMoney } = useAuth();
    return (
        <div>
            <Button onClick={getUnlockTime}>GetTime</Button>
            <Button onClick={withdrawMoney}>WithDraw</Button>
            <div>Home</div>
        </div>
    )
}

export default Home