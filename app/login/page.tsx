"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("กรุณากรอกอีเมล");
      isValid = false;
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("กรุณากรอกอีเมลให้ถูกต้อง");
      isValid = false;
    }

    if (!password) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      isValid = false;
    }

    return isValid;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-center">
            <div className="mb-4">
              <img
                src="/logo.svg"
                alt="วิทยาลัยการอาชีพกุมภวาปี"
                className="w-20 h-20 mx-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">วิทยาลัยการอาชีพกุมภวาปี</h1>
            <p className="text-orange-100 text-sm">ระบบสมาชิก</p>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">เข้าสู่ระบบ</h2>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="กรุณากรอกอีเมลของคุณ"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    emailError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  }`}
                />
                {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="กรุณากรอกรหัสผ่านของคุณ"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  }`}
                />
                {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 px-4 rounded-lg font-semibold text-white transition-all mt-6 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                ยังไม่มีบัญชี?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  ลงทะเบียน
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-orange-100 text-xs mt-6">
          © 2026 วิทยาลัยการอาชีพกุมภวาปี | สงวนลิขสิทธิ์
        </p>
      </div>
    </div>
  );
}