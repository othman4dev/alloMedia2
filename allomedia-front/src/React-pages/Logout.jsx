import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('user');
        window.location.href = 'http://localhost:5000/api/auth/logout';
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;