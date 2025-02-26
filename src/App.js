import "./style.css";
import { useState, useEffect } from "react";
import { Watermark, Input, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

function App() {
  const [voucherNumber, setVoucherNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);
  const [messages, setMessages] = useState({ 1: "Discount?", 2: "Discount?", 3: "Discount?" });
  const [isSplashing, setIsSplashing] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);
  const discountArray = ["3%", "5%", "10%", "15", ""];

  const handleLogin = () => {
    if (voucherNumber.trim() !== "") {
      setIsSplashing(true);
    }
  };

  useEffect(() => {
    if (isSplashing) {
      setTimeout(() => {
        setSplashFinished(true); // Trigger card game page after splash animation
        setIsLoggedIn(true); // Show card game page
      }, 4250); // Duration matches the splash animation time
    }
  }, [isSplashing]);

  const discountCard = (cardNumber) => {
    if (flippedCard !== null) return;
    const randomDiscount = discountArray[Math.floor(Math.random() * 4)];
    let newMessage = randomDiscount !== "" ? `${randomDiscount} discount applied!` : "We wish you a happy Thingyan";
    setMessages((prev) => ({ ...prev, [cardNumber]: newMessage }));
    setFlippedCard(cardNumber);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>Enter Voucher Number</h1>
        <Input
          type="text"
          size="large"
          value={voucherNumber}
          onChange={(e) => setVoucherNumber(e.target.value)}
          style={{ width: "220px" }}
          placeholder="Enter your voucher number"
        />
        <br />
        <Button
          type="primary"
          icon={<LoginOutlined />}
          size="large"
          className="voucher-submit-button"
          onClick={handleLogin}
        >
          Submit
        </Button>
        {isSplashing && <div className="splash-screen"></div>}
      </div>
    );
  }

  return (
    <div className={`app ${splashFinished ? "fade-out" : ""}`}>
      <div className="app-container">
        <div className="title">
          <h1>Choose a Card</h1>
        </div>

        <div className="cards-container">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`card-container ${flippedCard === num ? "flipped" : ""}`}
              onClick={() => discountCard(num)}
            >
              <div className="card-inner">
                <div className="card-front" />
                <div className="card-back">
                  <Watermark className="watermark" content={voucherNumber} height={50} gap={[5, 5]} font={{ color: "rgba(0, 0, 0, 0.05)", fontSize: 35 }}>
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
