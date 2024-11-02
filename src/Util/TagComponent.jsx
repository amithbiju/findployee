import React, { useState } from "react";

// Define initial tags with their active/inactive states
const initialTags = [
  { name: "All", active: true },
  { name: "Artificial Intelligence", active: true },
  { name: "Data", active: false },
  { name: "Development tools", active: false },
  { name: "End user applications", active: false },
  { name: "Infrastructure and cloud", active: true },
  { name: "Media", active: true },
  { name: "Operating systems", active: true },
  { name: "Programming languages", active: true },
  { name: "Science and medicine", active: false },
  { name: "Security", active: true },
  { name: "Social and communication", active: true },
  { name: "Web", active: false },
  { name: "Other", active: true },
];

const TagComponent = () => {
  // Manage the tags' active state
  const [tags, setTags] = useState(initialTags);

  // Toggle active state for each tag
  const toggleTag = (index) => {
    setTags((prevTags) =>
      prevTags.map((tag, i) =>
        i === index ? { ...tag, active: !tag.active } : tag
      )
    );
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-transparent rounded-lg">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium transition-colors ${
            tag.active ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => toggleTag(index)}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagComponent;
