// components/SelectItem.js
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectItem() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    axios.get('https://34cc358e49cc4ab4a0e2ded1ee5a1564.api.mockbin.io/')
      .then(response => {
        setStates(response.data.states);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);
  
  useEffect(() => {
    if (selectedState) {
      axios.get(`https://2a083fdfd4fc4330977bb6a891eefd5b.api.mockbin.io/`)
        .then(response => {
          setDistricts(response.data.districts);
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div className='flex justify-center items-center mt-8'>
      <div className='w-full max-w-md'>
        <select
          id="states"
          value={selectedState}
          onChange={handleStateChange}
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500'
        >
          <option value="">Select Activity</option>
          {states.map(state => (
            <option key={state.id} value={state.id}>{state.name}</option>
          ))}
        </select>

        <select
          id="districts"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className='block w-full border border-gray-300 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500'
        >
          <option value="">Select OEM</option>
          {districts.map(district => (
            <option key={district.id} value={district.id}>{district}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectItem;
