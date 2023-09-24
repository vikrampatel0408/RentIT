import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
const EditProfileScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const [otp, setOtp] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const indianCities = ["Mumbai", "Delhi", "Bangalore", "Kolkata"];
  const [formData, setFormData] = useState({
    _id: "",
    name: userData.name || "",
    gender: userData.gender || "",
    location: userData.location || "",
    phoneNumber: userData.phoneNumber || "",
  });
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");
    if (userDataFromCookie) {
      setLoading(false);
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        console.log(parsedUserData);
        setUserData(parsedUserData);
        setFormData({
          _id: parsedUserData._id,
          name: parsedUserData.name || "",
          gender: parsedUserData.gender || "",
          location: parsedUserData.location || "",
          phoneNumber: parsedUserData.phoneNumber || "",
        });
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (formData.phoneNumber.length < 10) {
      toast.error("Please Enter Valid Phone Number");
    } else {
    const phoneNumber = formData.phoneNumber;
    try {
      const response = await fetch(
        "http://localhost:6969/api/users/twilio-sms/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        }
      );
      if (response.ok) {
        toast.success("OTP sent successfully");

        setShowOtpInput(true);
      } else {
        toast.error("Please Enter Valid Phone Number");
      }
    } catch (error) {
      console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVerifyOTP = async () => {
    const phoneNumber = formData.phoneNumber;
    try {
      const response = await fetch(
        "http://localhost:6969/api/users/twilio-sms/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp,
            phoneNumber,
          }),
        }
      );

      if (response.ok) {
        toast.success("OTP verified successfully");

        setShowOtpInput(false);
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6969/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUserData = await response.json();
        console.log(updatedUserData);

        const storedUserData = Cookies.get("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          const updatedUser = { ...parsedUserData, ...updatedUserData };
          Cookies.set("userData", JSON.stringify(updatedUser), { expires: 7 });
          toast.success("Updated Successfully");
          navigate("/profile");
        }
      } else {
        console.log("No update");
      }
    } catch (error) {
      console.error("Error during update profile:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="flex items-center mb-4">
        <BiArrowBack
          className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleBackButtonClick}
        />
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto my-5 p-5">
          <h1 className="text-2xl font-semibold mb-5">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-2/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-600 text-sm font-semibold mb-2">
                Gender
              </span>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-2/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a city</option>
                {indianCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Phone Number
              </label>
              <div className="flex items-center">
                +91
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter Your Phone Number"
                  className="w-2/4 px-3 py-2 ml-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="bg-blue-500 text-white py-2 px-3 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Send OTP
                </button>
              </div>
            </div>

            {showOtpInput && (
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-2/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Verify OTP
                </button>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileScreen;
