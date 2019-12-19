import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <h2 style={{ marginBottom: "40px" }}>404 Page</h2>
            <Link to="/">&larr; back to nature</Link>
        </div>
    )
}

export default Page404;