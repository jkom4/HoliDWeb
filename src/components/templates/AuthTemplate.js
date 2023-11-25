import React from 'react';

const AuthTemplate = ({ children, navbar , footer  }) => (
    <div className="page-template">
        <header>{navbar}</header>
        <main>{children}</main>
        <footer>{footer}</footer>
    </div>
);

export default AuthTemplate;