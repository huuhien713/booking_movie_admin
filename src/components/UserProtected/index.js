import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtected = ( {children} ) => {
    const { user } = useSelector(state => state.authSlice);
    
    if (!user) {
        return <Navigate to='/' replace/>;
    } 

    return children;
}

export default UserProtected