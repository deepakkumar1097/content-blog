import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function EditBlog() {
  const location = useLocation();
  const { blogData } = location.state || {};
  // State to store form data
  const [formData, setFormData] = useState({
    title: blogData?.title || "",
    content: blogData?.content || "",
    // Add other fields as needed
  });

  // Auto-save functionality (example using useEffect)
  useEffect(() => {
    const saveData = () => {
      // Implement your saving logic here
      console.log("Auto-saving:", formData);
    };

    // Call saveData whenever formData changes
    // Save data every 5 seconds
    const autoSaveInterval = setInterval(saveData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <h2>Edit Blog</h2>
      {/* Your form goes here */}
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />

        {/* Add other form fields as needed */}
      </form>
    </div>
  );
}
