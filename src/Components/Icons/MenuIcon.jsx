import React from 'react';

const MenuIcon = (props) => {
    return (
        <svg
            className="fill-black"
            width={props.width}
            height={props.width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="12" r="1.5" />
            <circle cx="18" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
        </svg>
    );
};

export default MenuIcon;
