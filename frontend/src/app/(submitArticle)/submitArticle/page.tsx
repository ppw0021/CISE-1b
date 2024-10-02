"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "../../globals.css";

export default function SubmitArticle() {
  const router = useRouter(); // Initialize the router

  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    publisher: "",
    yearOfPublication: "",
    sePractice: "",
    claim: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate year is a valid number
    if (isNaN(Number(formData.yearOfPublication)) || formData.yearOfPublication.length !== 4) {
      alert("Please enter a valid 4-digit year.");
      return;
    }

    const articleData = new FormData(); // Use FormData to handle file uploads
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        articleData.append(key, value);
      }
    });

    try {
      // Send POST request to backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`, {
        method: "POST",
        body: articleData,
      });

      if (response.ok) {
        alert("Article submitted successfully!");
        router.push("/success"); // Redirect to a success page or wherever you'd like
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("An error occurred while submitting the article.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg font-bold mb-4">Submit Article</h1>
        
        {/* Form fields */}
        {[
          { label: "Article Title", name: "title", type: "text", placeholder: "Enter the title", required: true },
          { label: "Authors", name: "authors", type: "text", placeholder: "Enter authors' names", required: true },
          { label: "Publisher (Journal/Conference)", name: "publisher", type: "text", placeholder: "Enter the publisher", required: true },
          { label: "Year of Publication", name: "yearOfPublication", type: "text", placeholder: "YYYY", required: true },
          { label: "SE Practice", name: "sePractice", type: "text", placeholder: "Enter SE practice", required: true },
          { label: "Claim", name: "claim", type: "text", placeholder: "Enter claim", required: true },
        ].map(({ label, name, type, placeholder, required }) => (
          <div key={name} className="mb-2 flex flex-col items-start">
            <label className="text-left">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required={required}
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mt-4"
        >
          Submit Article
        </button>
        <button
          type="button"
          onClick={() => router.back()} // Navigate back to the previous page
          className="mt-4 bg-gray-300 text-black p-2 rounded"
        >
          Go Back
        </button>
      </form>
    </div>
  );
}
