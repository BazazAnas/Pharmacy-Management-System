import axios from "axios";
import React ,{useState} from "react";

function AddDrug({setDrugs}) {
    
    const [name,setName] = useState("");
    const [quantity,setQuantity] = useState("");
    const [price,setPrice] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3500/drugs",
                {name,price,quantity},
                {
                   headers: { 'Content-Type': 'application/json'},
                   withCredentials: true,
                })
            if (response.status === 200) {
                const newDrug = response.data;
                setDrugs((preValue)=>{
                    [...preValue,newDrug]
                })
                setName('');
                setQuantity('');
                setPrice('');
            }
        } catch (error) {
            console.error('Error adding drug:', error);
        }
    }

    return(
    <>
      <div>
      <h3>Add New Drug</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Drug name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
        <button type="submit">Add Drug</button>
      </form>
      </div>
    </>
    )
}

export default AddDrug;