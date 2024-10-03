import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const BreedSelector = ({ breeds, selectedBreeds, setSelectedBreeds }) => {
  const handleSelectChange = (value) => {
    setSelectedBreeds(value);
  };

  return (
    <div className='mx-3 pt-5'>
      <h5 className='text-center mb-3 fs-5 fw-bolder'>Select favorite dog breeds</h5>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Select your favorite dog breeds"
        value={selectedBreeds}
        onChange={handleSelectChange}
        optionFilterProp="children"
      >
        {breeds.map((breed, index) => (
          <Option key={index} value={breed}>
            {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default BreedSelector;
