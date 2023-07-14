"use client";
import React, { useState } from "react";
import {
  GnoWallet,
  GnoProvider,
  GnoJSONRPCProvider,
  GnoWSProvider,
} from "@gnolang/gno-js-client";

export default function Home() {
  const [message, setMessage] = useState("");
  const [expression, setExpression] = useState("");
  const [packagePath, setPackagePath] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState("");

  const handleConnectWallet = async () => {
    try {
      // Check if Adena wallet object exists
      if (!window.adena) {
        //open adena.app in a new tab if the adena object is not found
        window.open("https://adena.app/", "_blank");
      }

      // Connect to Adena wallet
      await window.adena.AddEstablish("Adena");

      //Get Account details
      const account = await window.adena.GetAccount();
      console.log(account.address);
      setConnectedAccount(account.address);
      // Set the wallet connection status
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
      setMessage("Error: Unable to connect wallet.");
    }
  };

  const handleButtonClick = async () => {
    try {
      const provider = new GnoJSONRPCProvider("http://test3.gno.land:36657");
      const output = await provider.evaluateExpression(packagePath, expression);
      setMessage(output);
    } catch (error) {
      console.log(error);
      setMessage("Error: Unable to retrieve render output");
    }
  };

  const handleButtonClick2 = async () => {
    try {
      const provider = new GnoJSONRPCProvider("http://test3.gno.land:36657");
      console.log(provider);
      const output = await provider.getFileContent(packagePath);
      setMessage(output);
    } catch (error) {
      console.log(error);
      setMessage("Error: Unable to retrieve file content");
    }
  };
  return (
    <div className="container mx-auto py-8 text-center">
      <div className="flex justify-end">
        {!walletConnected ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              disabled
            >
              Connected
            </button>
            <span className="ml-2 text-sm text-white">{connectedAccount}</span>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">Example demo sdk usage</h1>
      <input
        type="text"
        placeholder="Enter package path..."
        className="border border-gray-300 rounded px-4 py-2 mb-4 text-black"
        value={packagePath}
        onChange={(e) => setPackagePath(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter expression..."
        className="border border-gray-300 rounded px-4 py-2 mb-4 text-black"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />
      <div className="space-x-4">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Evaluate expression
        </button>
        <button
          onClick={handleButtonClick2}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Display File contents
        </button>
      </div>
      {message && <div className="text-xl font-bold mt-4">{message}</div>}
    </div>
  );

  // return (
  //   <div className="container mx-auto py-8 text-center">
  //     <h1 className="text-2xl font-bold mb-4">Example demo sdk usage</h1>
  //     <input
  //       type="text"
  //       placeholder="Enter package path..."
  //       className="border border-gray-300 rounded px-4 py-2 mb-4 text-black"
  //       value={packagePath}
  //       onChange={(e) => setPackagePath(e.target.value)}
  //     />
  //     <input
  //       type="text"
  //       placeholder="Enter expression..."
  //       className="border border-gray-300 rounded px-4 py-2 mb-4 text-black"
  //       value={expression}
  //       onChange={(e) => setExpression(e.target.value)}
  //     />
  //     <div className="space-x-4">
  //       <button
  //         onClick={handleButtonClick}
  //         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  //       >
  //         Evaluate expression
  //       </button>
  //       <button
  //         onClick={handleButtonClick2}
  //         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
  //       >
  //         Display File contents
  //       </button>
  //     </div>
  //     {message && <div className="text-xl font-bold mt-4">{message}</div>}
  //   </div>
  // );
}
