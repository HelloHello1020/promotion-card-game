import './style.css';
import { useState } from "react";
import { Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

function App() {
  const [isClicked, setIsClicked] = useState(false); // Track if any card was clicked
  const [discount1Message, setDiscount1Message] = useState('Discount?'); // Message for each card
  const [discount2Message, setDiscount2Message] = useState('Discount?'); // Message for each card
  const [discount3Message, setDiscount3Message] = useState('Discount?'); // Message for each card


  const discountArray = ["10%", "20%", "30%", ""];

  const discountCard = (cardNumber) => {
    if (isClicked) return; // Prevent clicking if any card was already clicked

    const randomDiscount = discountArray[Math.floor(Math.random() * 4)];
    
    // Update the discount message
    if (cardNumber === 1) {
      if (randomDiscount !== "") {
        setDiscount1Message(`${randomDiscount} discount applied!`);
      }
      else {
        setDiscount1Message(`We wish you a happy Thingyan`)
      }
      setDiscount2Message(`←`)
      setDiscount3Message(`←`)
    }
    else if (cardNumber === 2) {
      if (randomDiscount !== "") {
        setDiscount2Message(`${randomDiscount} discount applied!`);
      }
      else {
        setDiscount2Message(`We wish you a happy Thingyan`)
      }
      setDiscount3Message(`←`)
      setDiscount1Message(`→`)
    }
    else if (cardNumber === 3) {
      if (randomDiscount !== "") {
        setDiscount3Message(`${randomDiscount} discount applied!`);
      }
      else {
        setDiscount3Message(`We wish you a happy Thingyan`)
      }
      setDiscount1Message(`→`)
      setDiscount2Message(`→`)
    }
    // Disable further clicks
    setIsClicked(true);
  };

  return (
    <div className="app">
      <div className="cards-container">
        <div className="first-card-container">
          <Card
            className="first-card"
            title={<span style={{ fontSize: "40px" }}>First Card</span>}
            style={{ width: "300px", height: "300px", textAlign: "center", fontSize: "30px", backgroundColor: "#ffd700" }}
            onClick={() => discountCard(1)}
          >
            <p>{discount1Message}</p>
          </Card>
        </div>

        <div className="second-card-container">
          <Card
            className="second-card"
            title={<span style={{ fontSize: "40px" }}>Second Card</span>}
            style={{ width: "300px", height: "300px", textAlign: "center", fontSize: "30px", backgroundColor: "#ffd700" }}
            onClick={() => discountCard(2)}
          >
            <p>{discount2Message}</p>
          </Card>
        </div>

        <div className="third-card-container">
          <Card
            className="third-card"
            title={<span style={{ fontSize: "40px" }}>Third Card</span>}
            style={{ width: "300px", height: "300px", textAlign: "center", fontSize: "30px", backgroundColor: "#ffd700" }}
            onClick={() => discountCard(3)}
          >
            <p>{discount3Message}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;