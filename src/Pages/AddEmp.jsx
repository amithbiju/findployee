import React, { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import TagComponent from "../Util/TagComponent";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { app } from "../firebase/config";
import { useNavigate } from "react-router-dom";

// Define initial tags with their active/inactive states
const initialTags = [
  { name: "All", active: false },
  { name: "Artificial Intelligence", active: false },
  { name: "Data", active: false },
  { name: "Development tools", active: false },
  { name: "End user applications", active: false },
  { name: "Infrastructure and cloud", active: false },
  { name: "Media", active: false },
  { name: "Operating systems", active: false },
  { name: "Programming languages", active: false },
  { name: "Science and medicine", active: false },
  { name: "Security", active: false },
  { name: "Social and communication", active: false },
  { name: "Web", active: false },
  { name: "Other", active: false },
];

function AddEmp() {
  const navigate = useNavigate();
  // Manage the tags' active state
  const [tags, setTags] = useState(initialTags);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Toggle active state for each tag
  const toggleTag = (index) => {
    setTags((prevTags) =>
      prevTags.map((tag, i) =>
        i === index ? { ...tag, active: !tag.active } : tag
      )
    );
  };

  // Update selected skills array whenever tags change
  useEffect(() => {
    const activeTags = tags.filter((tag) => tag.active).map((tag) => tag.name);
    setSelectedSkills(activeTags);
  }, [tags]);

  //input values
  const [username, setUserName] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [empid, setEmpid] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [exp, setExp] = useState("");

  //todb
  const handleSubmit = (e) => {
    e.preventDefault();

    const db = getFirestore(app);
    addDoc(collection(db, "emplo"), {
      lname,
      fname,
      username,
      empid,
      dept,
      email,
      exp,
    }).then(() => {
      addDoc(collection(db, "skills"), {
        empid,
        selectedSkills,
        exp,
      }).then(() => {
        navigate("/dashboard");
      });
    });
  };
  return (
    <form className="p-28">
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium  text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    findployee.com/
                  </span>
                  <input
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Employee ID
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  value={empid}
                  onChange={(e) => setEmpid(e.target.value)}
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Department
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                >
                  <option>Select</option>
                  <option>Quality assurance</option>
                  <option>project Development</option>
                  <option>Testing</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Skills</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <div>
                <div className="flex flex-wrap gap-2 p-4 bg-transparent rounded-lg">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium transition-colors ${
                        tag.active
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => toggleTag(index)}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Display selected skills */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Selected Skills:</h3>
                  <ul>
                    {selectedSkills.map((skill, index) => (
                      <li key={index} className="text-blue-500">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Experience [No.of years]
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AddEmp;
