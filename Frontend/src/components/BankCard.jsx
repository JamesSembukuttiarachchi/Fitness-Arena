import React from 'react'
import SingleCard from './SingleCard'

const BankCard = ({cards}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((item) => (
        <SingleCard key={item._id} card={item} />
      ))}
    </div>
  )
}

export default BankCard