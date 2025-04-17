import React from "react";

function DrugList({drugs , addToBill}){
    return(
        <>
            <div>
                <h3>Drugs</h3>
                <ul>
                    {drugs.map(drug => (
                    <li key={drug.id}>
                    {drug.name} - ${drug.price} (Qty: {drug.quantity})
                    <button onClick={() => addToBill(drug)}>+</button>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default DrugList;