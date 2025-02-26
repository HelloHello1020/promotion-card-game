import "./style.css";
import { useState } from "react";
import { Watermark } from "antd";

function App() {
  const [flippedCard, setFlippedCard] = useState(null);
  const [messages, setMessages] = useState({ 1: "Discount?", 2: "Discount?", 3: "Discount?" });
  const discountArray = ["10%", "20%", "30%", ""];

  const discountCard = (cardNumber) => {
    if (flippedCard !== null) return;
    const randomDiscount = discountArray[Math.floor(Math.random() * 4)];
    let newMessage = randomDiscount !== "" ? `${randomDiscount} discount applied!` : "We wish you a happy Thingyan";
    setMessages((prev) => ({ ...prev, [cardNumber]: newMessage }));
    setFlippedCard(cardNumber);
  };

  return (
    <div className="app">
      <div className="cards-title-container">
        <div className="title">
          <h1>Choose a Card</h1>
        </div>

        <div className="cards-container">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`card-container ${flippedCard === num ? "flipped" : ""}`} onClick={() => discountCard(num)}>
              <div className="card-inner">
                <div className="card-front"/>
                <div className="card-back">
                  <Watermark className="watermark" content="1111" height={50} gap={[5, 5]}>
                    <h4 className="card-message">{messages[num]}</h4>
                  </Watermark>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
