import React, { useState, useEffect } from 'react';
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(props.isVisible);

  useEffect(() => {
    setPopupVisible(props.isVisible);
    if (!props.isVisible) {
      setSelectedAddress('');
    }
  }, [props.isVisible]);


  const postCodeStyle = {
    display: isPopupVisible ? "block" : "none",
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    height: "450px",
    padding: "5px",
    border: "2px solid #666",
    backgroundColor: 'white',
    zIndex: 9999,
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    
    setSelectedAddress(fullAddress);
  props.onAddData(fullAddress);
    props.onClose();
  };

  const handleClose = () => {
    setPopupVisible(false);
    props.onClose();
  };

  
  return (
    <div style={postCodeStyle}>
      <DaumPostcode
        onComplete={handlePostCode}
      />
      {isPopupVisible && (
         <button
        onClick={handleClose}
        style={{ marginTop: '20px' }}>닫기</button>
      )}
    </div>
  );
}

export default PopupPostCode;
