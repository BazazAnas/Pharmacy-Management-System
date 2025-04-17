import React from "react";

function Bill({ items , generateBill }) {
    const total = items.reduce( (sum,item) => sum +  item.price * item.quantity , 0)

    return(
    <>
    <div>
      <h3>Current Bill</h3>
      <ul>
        {items.map((item,index) => (
          <li key={index}>
            {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={generateBill} disabled={items.length === 0}>
        Generate Bill
      </button>
    </div>
    </>
    )
}

export default Bill;