import React, { useState } from 'react';
import { BsBack } from 'react-icons/bs';
import ModalDocument from '../ModalDocument';

import './styles.css';

function Card({subject, secretary, file, description}) {

  const fullDescription = description;
  const newFileName = file.slice(0, -5);
  const [ModalDocumentVisible, setModalDocumentVisible] = useState(false);
    
  if (description.length > 200) {
		description = description.substring(0, 200) + '...';
	}

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
        <button onClick={() => {setModalDocumentVisible(true)}}>
          <p>Abrir</p>
          <BsBack />
        </button>
      </div>
      <div className='content-card-description'>
        <p>{description}</p>
      </div>
      {ModalDocumentVisible ? <ModalDocument onclose={() => setModalDocumentVisible(false)} subject={subject} secretary={secretary} file={newFileName} description={fullDescription}/> : null}
    </div>
  );
}

export default Card;