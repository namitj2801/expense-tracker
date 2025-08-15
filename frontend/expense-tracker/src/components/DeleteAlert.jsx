import React from "react";

// Confirmation dialog component for delete operations
const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      {/* Display confirmation message */}
      <p className="text-sm">{content}</p>

      {/* Action buttons container */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
