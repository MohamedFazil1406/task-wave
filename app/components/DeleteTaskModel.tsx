"use client";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
};

export default function DeleteTaskModal({
  loading,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay (same page visible behind) */}
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />

      {/* Modal box */}
      <div className="relative w-[360px] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-black mb-3">Delete Task</h2>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 text-sm border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-1.5 text-sm bg-red-500 rounded text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
