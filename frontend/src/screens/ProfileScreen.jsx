import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");

    if (userDataFromCookie) {
      setLoading(false);
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        console.log(parsedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, [navigate, setLoading]);
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  const hasGender = userData.gender;
  const hasLocation = userData.location;
  const hasPhoneNumber = userData.phoneNumber;

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex items-center mb-4">
        <BiArrowBack
          className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleBackButtonClick}
        />
      </div>
      <div>
        {loading ? (
          <div className="text-center">
            <TailSpin color="grey" height={50} width={50} />
            <p>Loading user data...</p>
          </div>
        ) : (
          <div>
            <h3></h3>
            <div className="bg-gray-100">
              <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                  <div className="w-full md:w-3/12 md:mx-2">
                    <div
                      className="bg-white p-3 border-t-4 "
                      style={{ backgroundColor: "rgb(13,110,253)" }}
                    >
                      <div className="image overflow-hidden">
                        <img
                          className="h-auto w-full mx-auto"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSI1DfBDIv-jEpuqQDQx_wQ5p8VogUD6tAn3_V4BrqQlkLdsJ7eqbEiOD8nERJWUzkAMw&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                        {userData.name &&
                          userData.name[0].toUpperCase() +
                            userData.name.slice(1)}
                      </h1>
                      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <span className="pr-0">Verification</span>
                        <li className="flex items-center py-3">
                          <span>Phone No</span>
                          <span className="ml-auto">
                            <span
                              className={`${
                                hasPhoneNumber ? "bg-green-500" : "bg-red-500"
                              } py-1 px-2 rounded text-white text-sm`}
                            >
                              {hasPhoneNumber ? "Done" : "Not Done"}
                            </span>
                          </span>
                        </li>
                        {/* <li className="flex items-center py-3">
                          <span>Email</span>
                          <span className="ml-auto">
                            <span
                              className={`${
                                hasPhoneNumber ? "bg-green-500" : "bg-red-500"
                              } py-1 px-2 rounded text-white text-sm`}
                            >
                              {hasPhoneNumber ? "Done" : "Not Done"}
                            </span>
                          </span>
                        </li> */}
                        <li className="flex items-center py-3">
                          <span>Member since</span>
                          <span className="ml-auto">
                            {userData.createdAt.slice(0, 10)}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Last Updated</span>
                          <span className="ml-auto">
                            {userData.updatedAt.slice(0, 10)}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="my-4"></div>
                  </div>
                  <div className="w-full md:w-9/12 mx-2 h-64">
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                      </div>
                      <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                          <div className="grid grid-cols-2">
                            <div className="px-2 py-2 font-semibold">Name</div>
                            <div className="px-2 py-2">
                              {userData.name &&
                                userData.name[0].toUpperCase() +
                                  userData.name.slice(1)}
                            </div>
                          </div>

                          <div className="grid grid-cols-2">
                            <div className="px-2 py-2 font-semibold">
                              Gender
                            </div>
                            <div
                              className={`px-2 py-2 ${
                                hasGender ? "" : "text-red-500"
                              }`}
                            >
                              {hasGender
                                ? userData.gender[0].toUpperCase() +
                                  userData.gender.slice(1)
                                : "Please enter your gender."}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-2 py-2 font-semibold">Email</div>
                            <div className={"px-2 py-2"}>{userData.email}</div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-2 py-2 font-semibold">
                              Location
                            </div>
                            <div
                              className={`px-2 py-2 ${
                                hasLocation ? "" : "text-red-500"
                              }`}
                            >
                              {hasLocation
                                ? userData.location
                                : "Please enter your location."}
                            </div>
                          </div>

                          <div className="grid grid-cols-2">
                            <div className="px-2 py-2 font-semibold">
                              Contact No.
                            </div>
                            <div
                              className={`px-2 py-2 ${
                                hasPhoneNumber ? "" : "text-red-500"
                              }`}
                            >
                              {hasPhoneNumber
                                ? userData.phoneNumber
                                : "Please enter your phone number."}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate("/edit-profile")}
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                      >
                        Edit Profile
                      </button>
                    </div>
                    <div className="my-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileScreen;
