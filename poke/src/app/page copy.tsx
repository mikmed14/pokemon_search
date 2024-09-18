"use client";

import "./module.css";

import React from "react";
import { MantineProvider } from "@mantine/core";


import { useState, useRef } from 'react';
import { Autocomplete, Loader } from '@mantine/core';

function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
      }, 1000);
    }
  };
  return (
    <>
    <div className="poke_container">
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        label="Pokemon search"
        placeholder="Your email"
        className="poke_input"
      />
      <button type="button" className="poke_button">Click Me</button>
    </div>
    </>
  );

}


function MyApp() {
  return (
    <MantineProvider>
      <AutocompleteLoading/>
    </MantineProvider>
  );
}

export default MyApp;

