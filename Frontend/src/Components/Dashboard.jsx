import React from "react";
import "./../styles/dashboard.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddDrug from "./AddDrug"
import DrugList from "./DrugList"
import Bill from "./Bill"

function Dashboard(){

const [drugs,setDrugs] = React.useState([]);
const [billItems, setBillItems] = React.useState([]);
const [searchTerm, setSearchTerm] = React.useState('');
const [notification, setNotification] = React.useState('');
const navigate = useNavigate();

React.useEffect(() => {       
        async function getDrugs() {
          try {
            const response = await axios.get("http://localhost:3500/drugs", { withCredentials: true });
            const data = response.data;
            setDrugs(data);
            
            const zeroStock = data.filter((drug) => drug.quantity === 0);
            if (zeroStock.length > 0) {
              setNotification(`Out of stock: ${zeroStock.map((d) => d.name).join(', ')}`);
            }
          } catch (error) {
            navigate("/login");
          }
        }
        getDrugs(); 
      }, [navigate]);
 
      function addToBill(drug) {
        setBillItems((prevValue) => {
            const existing = prevValue.find((item) => item.drug_id === drug.id);
            
            if (existing) {
                return prevValue.map((item) => 
                    item.drug_id === drug.id ? {...item, quantity: item.quantity + 1} : item
                );
            } else {
                return [...prevValue, { drug_id: drug.id, name: drug.name, price: drug.price, quantity: 1 }];
            }
        });
    }
    

 async function generateBill() {
    try {
        console.log("generate bill called")
         await axios.post("http://localhost:3500/bills",
         {items:billItems},
            {
               headers: { 'Content-Type': 'application/json'},
               withCredentials: true,
            })
         setBillItems([]);
         const response = await axios.get( "http://localhost:3500/drugs" , { withCredentials : true } )
         const data = response.data;
         setDrugs(data);   
    } catch (error) {
        console.log("Error generating bill:",error);
    }
 }

 return(
    <>
    <div className="body">
    <div className="dashboard_container">
      <button className="logout_button" onClick={() => navigate('/logout')}>Logout</button>
      {notification && <div className="notification">{notification}</div>}
      
      <div className="add_drug_section">
        <AddDrug setDrugs={setDrugs} />
      </div>
      
      <input
        type="text"
        className="search_bar"
        placeholder="Search drugs..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    <div className="drug_list">
        <DrugList 
        // drugs={drugs.filter(drug => {
        // return drug.name.toLowerCase().includes(searchTerm.toLowerCase()); // Add return here
        // })}
        // addToBill={addToBill}
              drugs={(drugs || []).filter(drug => {
                return drug.name.toLowerCase().includes(searchTerm.toLowerCase());
              })}
              addToBill={addToBill}
        />
    </div>

      <div className="bill_section">
        <Bill items={billItems} generateBill={generateBill} />
      </div>
    </div>
    </div>
    </>
 )
}

export default Dashboard;