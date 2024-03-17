import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

const SearchFilters = ({ onSearch, onFilter }) => {
  const handleChange = (value) => {
    onFilter(value);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <Input
        placeholder="Search contacts..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: 200, marginRight: '16px' }}
      />
      <Select
        defaultValue="All"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="All">All</Option>
        <Option value="Favorites">Favorites</Option>
      </Select>
    </div>
  );
};

export default SearchFilters;