import React from 'react';
import { BsBack } from 'react-icons/bs';

import './styles.css';

function Card({subject, secretary, file, description}) {
    
  if (description.length > 200) {
		description = description.substring(0, 200) + '...';
	}

  const newFileName = file.slice(0, -5);


  return (
    <div className='container-card'>
      <div className='content-card-head'>
        <div>
          <div className='content-title'>
            <p style={{fontWeight: 'bold'}}>Assunto:</p>
            <p>{subject}</p>
          </div>
          <div className='content-title'>
            <p style={{fontWeight: 'bold'}}>Secretário:</p>
            <p>{secretary}</p>
          </div>
          <div className='content-title'>
            <p style={{fontWeight: 'bold'}}>Arquivo:</p>
            <p>{newFileName}</p>
          </div>
        </div>
        <button>
          <p>Abrir</p>
          <BsBack />
        </button>
      </div>
      <div className='content-card-description'>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;