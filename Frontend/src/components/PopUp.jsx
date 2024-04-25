import React from "react";

const MyModal = () => {
  const openModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        Open modal
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete this entry
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={closeModal}>
                Yes
              </button>
              <button className="btn" onClick={closeModal}>
                No
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyModal;
