// design-gpt-web/client/src/pages/MethodPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@arco-design/web-react';

const MethodPage = () => {
  const { id } = useParams();
  const [method, setMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMethodData = async () => {
      try {
        const response = await axios.get(`/api/method/${id}`);
        if (response.data.status === 'success') {
          setMethod(response.data.data);
        } else {
          console.error('Error fetching method data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching method data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMethodData();
  }, [id]);

  if (isLoading) {
    return (
      <Skeleton
      ></Skeleton>
    );
  }

  if (!method) {
    return (
        <Skeleton ></Skeleton>
        //   text={{
        //     rows: 3,
        //     width: ['100%', 600, 400],
        //   }}
       
      );
    return <div>No method data found</div>;
  }

  return (
    <div>
      <h1>{method.name}</h1>
      <p>{method.description}</p>
      <h2>Parameters</h2>
      <ul>
        {method.parameters.map((param, index) => (
          <li key={index}>
            <strong>{param.name} ({param.type}):</strong> {param.description}
          </li>
        ))}
      </ul>
      <h2>Returns</h2>
      <p>
        <strong>{method.returns.type}:</strong> {method.returns.description}
      </p>
      {/* Render other method details here */}
    </div>
  );
};

export default MethodPage;
