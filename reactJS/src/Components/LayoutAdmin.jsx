import React, { Suspense } from 'react';

const AdminRoute = ({ children }) => {
    return (<>
        <Suspense fallback={<p>Loading...</p>}>
            {children}
        </Suspense>
    </>);
};

export default AdminRoute;