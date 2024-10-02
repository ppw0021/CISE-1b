"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "../../globals.css";

export default function SubmitArticle() {
  const router = useRouter(); // Initialize the router
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [journalName, setJournalName] = useState("");
  const [yearOfPublication, setYearOfPublication] = useState("");
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [pages, setPages] = useState("");
  const [doi, setDoi] = useState("");
  const [bibtexFile, setBibtexFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate year is a valid number
    if (isNaN(Number(yearOfPublication)) || yearOfPublication.length !== 4) {
      alert("Please enter a valid 4-digit year.");
      return;
    }

    const articleData = {
      title,
      authors,
      journalName,
      yearOfPublication,
      volume,
      number,
      pages,
      doi,
      bibtexFile,
    };

    // Handle form submission logic (POST to backend or API)
    console.log(articleData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBibtexFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="bg-white shadow-2xl rounded-lg p-6 w-80 text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg font-bold mb-4">Submit Article</h1>
        
        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">Article Title</label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">Authors</label>
          <input
            type="text"
            placeholder="Enter authors' names"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">Journal Name</label>
          <input
            type="text"
            placeholder="Enter the journal name"
            value={journalName}
            onChange={(e) => setJournalName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">Year of Publication</label>
          <input
            type="text"
            placeholder="YYYY"
            value={yearOfPublication}
            onChange={(e) => setYearOfPublication(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">Volume</label>
          <input
            type="text"
            placeholder="Enter volume number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">Number (Issue)</label>
          <input
            type="text"
            placeholder="Enter issue number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">Pages</label>
          <input
            type="text"
            placeholder="Enter page range"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">DOI</label>
          <input
            type="text"
            placeholder="Enter DOI"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-2 flex flex-col items-start">
          <label className="text-left">BibTeX File (optional)</label>
          <input
            type="file"
            accept=".bib"
            onChange={handleFileChange}
            className="p-2 border rounded w-full"
          />
          <small className="text-gray-500">Optional: Upload a BibTeX file</small>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mt-4"
        >
          Submit Article
        </button>
        <button
        onClick={() => router.back()} // Navigate back to the previous page
        className="mt-4 bg-gray-300 text-black p-2 rounded"
      >
        Go Back
      </button>
      </form>
      {/* Go Back Button */}

    </div>
  );
}
