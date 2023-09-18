import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const ProfileScreen = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");

    if (userDataFromCookie) {
      setLoading(false);
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, [navigate, setLoading]);

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <TailSpin color="grey" height={80} width={80} />
          <p>Loading user data...</p>
        </div>
      ) : (
        <div>
          <h3>
            {userData.name[0].toUpperCase() + userData.name.slice(1)}'s Profile
          </h3>
          <div class="bg-gray-100">
            <div class="container mx-auto my-5 p-5">
              <div class="md:flex no-wrap md:-mx-2 ">
                <div class="w-full md:w-3/12 md:mx-2">
                  <div class="bg-white p-3 border-t-4 border-green-400">
                    <div class="image overflow-hidden">
                      <img
                        class="h-auto w-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt=""
                      />
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                      {userData.name[0].toUpperCase() + userData.name.slice(1)}
                    </h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">
                      Owner at Her Company Inc.
                    </h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                      About user
                    </p>
                    <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li class="flex items-center py-3">
                        <span>Status</span>
                        <span class="ml-auto">
                          <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                            Active
                          </span>
                        </span>
                      </li>
                      <li class="flex items-center py-3">
                        <span>Member since</span>
                        <span class="ml-auto">Nov 07, 2016</span>
                      </li>
                    </ul>
                  </div>
                  <div class="my-4"></div>
                </div>
                <div class="w-full md:w-9/12 mx-2 h-64">
                  <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg
                          class="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span class="tracking-wide">About</span>
                    </div>
                    <div class="text-gray-700">
                      <div class="grid md:grid-cols-2 text-sm">
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">First Name</div>
                          <div class="px-4 py-2">Jane</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Last Name</div>
                          <div class="px-4 py-2">Doe</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Gender</div>
                          <div class="px-4 py-2">Female</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Contact No.</div>
                          <div class="px-4 py-2">+11 998001001</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">
                            Current Address
                          </div>
                          <div class="px-4 py-2">
                            Beech Creek, PA, Pennsylvania
                          </div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">
                            Permanant Address
                          </div>
                          <div class="px-4 py-2">
                            Arlington Heights, IL, Illinois
                          </div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Email.</div>
                          <div class="px-4 py-2">
                            <a
                              class="text-blue-800"
                              href="mailto:jane@example.com"
                            >
                              jane@example.com
                            </a>
                          </div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Birthday</div>
                          <div class="px-4 py-2">Feb 06, 1998</div>
                        </div>
                      </div>
                    </div>
                    <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                      Show Full Information
                    </button>
                  </div>
                  <div class="my-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
