import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null); //imp
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    // Select the password input field
    passwordRef.current?.select();
    // Set the selection range, only for showing
    passwordRef.current?.setSelectionRange(0, 15);
    // 2 ways to copy the selected text to the clipboard
    // window.navigator.clipboard.writeText(password);    this is direct tareeka
    window.navigator.clipboard.writeText(passwordRef.current.value);
    // Set copied state to true to show the "Copied!" message
    setCopied(true);
    // Reset the copied state after 800 ms
    setTimeout(() => {
      setCopied(false);
    }, 800);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      {/*  */}
      <h1 className="text-white text-center my-3">Password Generator</h1>
      {/*  */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-gray-900 text-white"
          placeholder="Password"
          readOnly
          ref={passwordRef} //very imp step
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            copied ? "bg-green-500" : ""
          }`}
          style={{ transition: "background-color 0.3s ease" }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/*  */}
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={5}
            max={15}
            value={length}
            className="cursor-pointer"
            id="length"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
