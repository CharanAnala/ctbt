"use client";
import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';

function TextOnly() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    if (!topic || !duration || !hoursPerDay) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, duration, hoursPerDay }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      setResponse(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[50%] border-2 m-auto rounded-2xl flex flex-col px-5 py-10 items-center ">
      <label htmlFor="topic" className="px-3 py-5 font-bold text-2xl">
        Enter your topic
      </label>
      <input
        type="text"
        className="w-[70%] rounded-3xl p-2 border-none outline-none text-black px-5"
        placeholder="Javascript"
        id="topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <div className="flex items-center justify-center gap-10 mt-8">
        <div>
          <select
            id="duration"
            className="bg-white text-black rounded-3xl py-5 px-3 border-none outline-none"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Select the duration</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="3 weeks">3 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2 months">2 months</option>
            <option value="3 months">3 months</option>
            <option value="4 months">4 months</option>
          </select>
        </div>
        <div>
          <select
            id="hoursPerDay"
            className="bg-white text-black rounded-3xl py-5 px-3 border-none outline-none"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
          >
            <option value="">Select Number of hours per day</option>
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3">3 Hours</option>
            <option value="4">4 Hours</option>
            <option value="5">5 Hours</option>
          </select>
        </div>
      </div>
      <div>
        <button 
          className="border-2 border-blue-600 px-5 py-2 rounded-full bg-blue-600 mt-6"
          onClick={handleClick}
        >
          Generate
        </button>
      </div>
      <div>
        {/* Display generated study plan here */}
        {response}
      </div>
    </div>
  );
}

export default TextOnly;