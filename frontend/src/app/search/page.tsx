import { useState } from 'react';

export default function SearchPage() {

  const [entryTerm, setEntryTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryTerm(e.target.value);
  }

  const handleInput = () => {
    console.log("Username:", entryTerm);
    //Logic goes here
  }
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-lg font-bold">Search Page.</h1>
    </div>
  );
}
