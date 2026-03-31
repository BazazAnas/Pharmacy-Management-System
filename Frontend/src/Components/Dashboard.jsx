import React from "react";
import "./../styles/dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddDrug from "./AddDrug";
import DrugList from "./DrugList";
import Bill from "./Bill";

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Dashboard() {
  const [drugs, setDrugs] = React.useState([]);
  const [billItems, setBillItems] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [notification, setNotification] = React.useState("");
  const navigate = useNavigate();

  useScrollReveal();

  React.useEffect(() => {
    async function getDrugs() {
      try {
        const response = await axios.get("http://localhost:3500/drugs", {
          withCredentials: true,
        });
        const data = response.data;
        setDrugs(data);
        const zeroStock = data.filter((drug) => drug.quantity === 0);
        if (zeroStock.length > 0) {
          setNotification(
            `Out of stock: ${zeroStock.map((d) => d.name).join(", ")}`
          );
        }
      } catch (error) {
        console.log(error)
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
          item.drug_id === drug.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevValue,
          { drug_id: drug.id, name: drug.name, price: drug.price, quantity: 1 },
        ];
      }
    });
  }

  async function generateBill() {
    try {
      await axios.post(
        "http://localhost:3500/bills",
        { items: billItems },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setBillItems([]);
      const response = await axios.get("http://localhost:3500/drugs", {
        withCredentials: true,
      });
      setDrugs(response.data);
    } catch (error) {
      console.log("Error generating bill:", error);
    }
  }

  /* ── Derived stats ── */
  const totalDrugs = drugs.length;
  const inStock = drugs.filter((d) => d.quantity > 0).length;
  const outOfStock = drugs.filter((d) => d.quantity === 0).length;

  const filteredDrugs = (drugs || []).filter((drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="body">
      <div className="dashboard_container">

        {/* ── Header ── */}
        <header className="dashboard_header">
          <div className="header_brand">
            <div className="header_brand_icon">💊</div>
            <span className="header_brand_name">
              Pharma<span>OS</span>
            </span>
          </div>
          <div className="header_actions">
            <button
              className="logout_button"
              onClick={() => navigate("/logout")}
            >
              Logout
            </button>
          </div>
        </header>

        {/* ── Notification ── */}
        {notification && (
          <div className="notification">{notification}</div>
        )}

        {/* ── Main Grid ── */}
        <div className="dashboard_content">

          {/* Stats Row */}
          <div className="stats_row">
            <div className="stat_card scroll-reveal">
              <div className="stat_icon cyan">💊</div>
              <div className="stat_info">
                <div className="stat_value">{totalDrugs}</div>
                <div className="stat_label">Total Drugs</div>
              </div>
            </div>
            <div className="stat_card scroll-reveal" style={{ transitionDelay: "0.08s" }}>
              <div className="stat_icon blue">✅</div>
              <div className="stat_info">
                <div className="stat_value">{inStock}</div>
                <div className="stat_label">In Stock</div>
              </div>
            </div>
            <div className="stat_card scroll-reveal" style={{ transitionDelay: "0.16s" }}>
              <div className="stat_icon amber">⚠️</div>
              <div className="stat_info">
                <div className="stat_value">{outOfStock}</div>
                <div className="stat_label">Out of Stock</div>
              </div>
            </div>
          </div>

          {/* Add Drug */}
          <div className="add_drug_section scroll-reveal">
            <p className="section_label">Add New Drug</p>
            <AddDrug setDrugs={setDrugs} />
          </div>

          {/* Search Bar */}
          <div className="search_wrapper scroll-reveal">
            <span className="search_icon">🔍</span>
            <input
              type="text"
              className="search_bar"
              placeholder="Search drugs by name…"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Drug List */}
          <div className="drug_list_wrapper scroll-reveal">
            <p className="section_label">Drug Inventory</p>
            <div className="drug_list">
              <DrugList drugs={filteredDrugs} addToBill={addToBill} />
            </div>
          </div>

          {/* Bill */}
          <div className="bill_section scroll-reveal">
            <p className="section_label">Current Bill</p>
            <Bill items={billItems} generateBill={generateBill} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
