import { useEffect, useState } from 'react';
import { getOnePhoneStorage } from '../../services/api';

const OneElementSpareParts = ({ telephone = {}, query = '', loading }) => {
  const { brand, model, spareParts } = telephone;

  console.log(loading);
  const array = Object.entries(spareParts || {});
  console.log(array);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : model ? (
        <>
          <h2>{brand}</h2>
          <h3>{model}</h3>
          <p>Запчастини</p>
          <ul>
            {array.map((item, index) => (
              <p key={index}>
                {item[0]} : {item[1]}
              </p>
            ))}
          </ul>
        </>
      ) : (
        <h2>Модель {query} не має запчастин</h2>
      )}
    </>
  );
};

export default OneElementSpareParts;
