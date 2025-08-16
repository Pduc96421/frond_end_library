import { useState } from "react";
import OTPVerification from "../OTPVerification";
import ForgotPasswordRequest from "../ForgotPasswordRequest/ForgotPasswordRequest";

function ForgotPasswordModal({ open, onClose, onLogin }) {
  const [showOtpField, setShowOtpField] = useState(false);
  const [email, setEmail] = useState("");

  const handleOTPSent = (email) => {
    setEmail(email);
    setShowOtpField(true);
  };

  const handleBack = () => {
    setShowOtpField(false);
  };

  const handleClose = () => {
    setShowOtpField(false);
    setEmail("");
    onClose();
  };

  if (showOtpField) {
    return <OTPVerification open={open} onClose={handleClose} onLogin={onLogin} email={email} onBack={handleBack} />;
  }

  return <ForgotPasswordRequest open={open} onClose={handleClose} onOTPSent={handleOTPSent} />;
}

export default ForgotPasswordModal;
