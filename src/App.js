import "./style.css";
import { useState, useEffect, useRef } from "react";
import { Watermark, Input, Button, Typography } from "antd"; // Import Typography from Ant Design
import { LoginOutlined } from "@ant-design/icons";
import { db } from "./firebase"; // Import Firestore
import { doc, getDoc } from "firebase/firestore";

const { Text } = Typography; // Destructure Text from Typography

function App() {
  const [voucherNumber, setVoucherNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);
  const [messages, setMessages] = useState({ 1: "", 2: "", 3: "" });
  const [isSplashing, setIsSplashing] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);
  const [voucherValid, setVoucherValid] = useState(true); // Initially, set voucherValid to true to avoid showing error on first render
  const chooseCardTitle = useRef();
  
  const discountArray = ["3%", "5%", "10%", "15%", ""];
  const noDiscountArray = ["We wish you a happy Thingyan", "Have a great year ahead", "Thanks for playing", "Play another time with a new voucher", "Maybe next time!"];

  const handleLogin = async () => {
    if (voucherNumber.trim() !== "") {
      try {
        const docRef = doc(db, "vouchers-collection", "vouchers-document");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const vouchersNumbers = docSnap.data()["vouchers-numbers"];
          // Check if the entered voucher number is in the array
          if (vouchersNumbers && vouchersNumbers.includes(String(voucherNumber))) {
            setVoucherValid(true);
            setIsSplashing(true);
          } else {
            setVoucherValid(false); // Set to false if voucher number is invalid
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching voucher data: ", error);
      }
    }
  };

  useEffect(() => {
    if (isSplashing) {
      setTimeout(() => {
        setSplashFinished(true); // Trigger card game page after splash animation
        setIsLoggedIn(true); // Show card game page
      }, 5100); // Duration matches the splash animation time
    }
  }, [isSplashing]);

  const discountCard = (cardNumber) => {
    if (flippedCard !== null) return;
    const randomDiscount = discountArray[Math.floor(Math.random() * 4)];
    const randomNoDiscount = noDiscountArray[Math.floor(Math.random() * 4)];
    let newMessage = randomDiscount !== "" ? `${randomDiscount} discount applied!` : `${randomNoDiscount}`;
    chooseCardTitle.current.innerText = `You have chosen card #${cardNumber}`;
    setMessages((prev) => ({ ...prev, [cardNumber]: newMessage }));
    setFlippedCard(cardNumber);
  };

  return (
    <div className={`app ${splashFinished ? "fade-out" : ""}`}>
      <div className="image-overlay" />

      <div className="app-container">
        {isLoggedIn ? (
          <div>
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
                      <Watermark className="watermark" content={voucherNumber} height={50} gap={[5, 5]} font={{ color: "rgba(0, 170, 255, 0.1)", fontSize: 35 }}>
                        <h4 className="card-message">{messages[num]}</h4>
                      </Watermark>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="title">
              <h1 class="choose-a-card-title" ref={chooseCardTitle}>Choose a Card Above</h1>
            </div>
          </div>
        ) : (
          <div className="login-container">
            <h1>Enter Voucher</h1>
            <Input
              type="text"
              size="large"
              value={voucherNumber}
              onChange={(e) => setVoucherNumber(e.target.value)}
              style={{ width: "350px" }}
              placeholder="Enter your purchased voucher number to play"
            />
            <br />
            <Button
              type="primary"
              icon={<LoginOutlined />}
              size="large"
              className="voucher-submit-button"
              onClick={handleLogin}
              style={{backgroundColor: "#ffd700"}}
            >
              Submit
            </Button>
            
            <br />
            {voucherValid === false && (
              <Text className="invalid-voucher-text" type="danger">
                Invalid voucher number
              </Text>
            )}

            {isSplashing && <div className="splash-screen"></div>}
          </div>
        )}
      </div>

      <img
        src="/thingyan-3-people.png" // Make sure this is the correct path
        alt="decorative"
        className="bottom-left-image decoration"
      />

      <img
        src="/thingyan-1-people.png" // Make sure this is the correct path
        alt="decorative"
        className="bottom-right-image decoration"
      />

      <img 
        src="/padauk-from-top.png"
        alt="decorative" 
        className="top-left-image decoration"
      />

      <img
        src="/padauk-from-top.png"
        alt="decorative"
        className="top-left-middle-image decoration"
      />

      <img
        src="/padauk-from-top.png"
        alt="decorative"
        className="top-left-center-image decoration"
      />

      <img
        src="/padauk-from-top.png"
        alt="decorative"
        className="top-center-image decoration"
      />

      <img
        src="/padauk-from-top.png"
        alt="decorative"
        className="top-right-center-image decoration"
      />

      <img
        src="/padauk-from-top.png"
        alt="decorative"
        className="top-right-middle-image decoration"
      />

      <img 
        src="/padauk-from-top.png"
        alt="decorative" 
        className="top-right-image decoration"
      />

      <img
        src="water-gun-shooting-right.png"
        alt="decorative"
        className="middle-left-image decoration"
      />

      <img
        src="water-gun-shooting-left.png"
        alt="decorative"
        className="middle-right-image decoration"
      />

    </div>
  );
}

export default App;
