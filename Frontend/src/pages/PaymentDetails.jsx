import React from 'react'

const PaymentDetails = () => {
  return (
    <div>
    <div className='container'>
    <form action=''>
      <div className="row">
        <div className="col">
          <h3 className='title'>Billing address:</h3>

          <div className="inputBox">
            <span>Full Name</span>
            <input type="text" placeholder='John Deo'/>
          </div>

          <div className="inputBox">
            <span>Email</span>
            <input type="email" placeholder='example@example.com'/>
          </div>

          <div className="inputBox">
            <span>Address: </span>
            <input type="text" placeholder='room - street - locality'/>
          </div>

          <div className="inputBox">
            <span>City</span>
            <input type="text" placeholder='Colombo'/>
          </div>

          <div className="flex">
            <div className="inputBox">
              <span>State</span>
              <input type="text" placeholder='Sri Lanka'/>
            </div>

            <div className="inputBox">
              <span>Zip Code</span>
              <input type="text" placeholder='123 456'/>
            </div>
          </div>
        </div>

        <div className="col">
          <h3 className='title'>Payment</h3>

          <div className="inputBox">
            <span>Cards Accepted</span>
            <img src=''></img>
          </div>

          <div className="inputBox">
            <span>Name on card</span>
            <input type="text" placeholder='John Deo'/>
          </div>

          <div className="inputBox">
            <span>Credit Card Number: </span>
            <input type="number" placeholder='1111-2222-3333-4444'/>
          </div>

          <div className="inputBox">
            <span>Expiry Month</span>
            <input type="text" placeholder='january'/>
          </div>

          <div className="flex">
            <div className="inputBox">
              <span>Expiry Year</span>
              <input type="number" placeholder='2022'/>
            </div>

            <div className="inputBox">
              <span>CVV:</span>
              <input type="number" placeholder='123'/>
            </div>
          </div>
        </div>
      </div>

      <input type="submit" value="Proceed to submit" className='submitBtn'/>
    </form>
      </div></div>
  )
}

export default PaymentDetails

