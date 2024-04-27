import React from 'react'

function BookAppoinment() {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-wide bg-orange-500 text-white rounded-lg" onClick={()=>document.getElementById('my_modal_5').showModal()}> <button>
          Book Appoinment
        </button></button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Book Appoinment</h3>
    <div>
        <div className='grid grid-cols-2'>
            {/* calender */}
            <div>

            </div>



            {/* Time slot */}
            <div>
                
            </div>
        </div>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default BookAppoinment
