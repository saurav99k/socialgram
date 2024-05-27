// Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import ProtectedAxios from './axisConfig';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const isAuthenticated = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await ProtectedAxios.get('/protected');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Dashboard;