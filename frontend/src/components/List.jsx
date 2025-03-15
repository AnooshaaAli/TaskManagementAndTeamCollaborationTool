import React from "react";
import DeleteList from "./DeleteList";

const List = ({ listID, name, projectID, onDelete }) => {
    return (
        <div>
            <h2>{name} (ID: {listID})</h2>
            <div>
                blah blah
            </div>
            <DeleteList listID={listID} onDeleteSuccess={() => onDelete(listID)} />
        </div>
    );
};

export default List;
