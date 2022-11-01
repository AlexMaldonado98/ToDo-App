import React from "react";
export const Filter = ({changeFilter}: {changeFilter:(e:"all" | "active" | "complete") => void}) => {

    return (
        <div className="filter">
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('complete')}>Complete</button>
        </div>
    );
};

