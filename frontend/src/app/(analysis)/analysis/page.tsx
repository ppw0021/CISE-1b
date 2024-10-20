"use client";
import React from 'react';
import AcceptedArticles from '../../(components)/AcceptedArticles';  // Import the AcceptedArticles component

export default function AnalysisPage() {
  return (
    <div className="bg-white shadow-2xl rounded-lg p-6 text-center">
      <h1 style={{ textAlign: 'center' }}>Analysis Page</h1>
      <AcceptedArticles />
    </div>
  );
}
