"use client";
import React from 'react';
import AcceptedArticles from '../../(components)/AcceptedArticles';  // Import the AcceptedArticles component

export default function AnalysisPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}><u>Analysis Page</u></h1>
      <AcceptedArticles />  {/* Call the AcceptedArticles component here */}
      {/* Additional analysis content can go here */}
    </div>
  );
}
