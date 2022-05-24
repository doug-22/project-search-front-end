import React from 'react';
import { BsBack } from 'react-icons/bs';

import './styles.css';

function Card() {
    
  let description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  if (description.length > 200) {
		description = description.substring(0, 200) + '...';
	}  


  return (
      <div className='container-card'>
          <div className='content-card-head'>
              <div>
                <div className='content-title'>
                    <p style={{fontWeight: 'bold'}}>Assunto:</p>
                    <p>Teste</p>
                </div>
                <div className='content-title'>
                    <p style={{fontWeight: 'bold'}}>Secretário:</p>
                    <p>Douglas</p>
                </div>
                <div className='content-title'>
                    <p style={{fontWeight: 'bold'}}>Arquivo:</p>
                    <p>Teste</p>
                </div>
              </div>
              <button>
                  <p>Abrir</p>
                  <BsBack />
              </button>
          </div>
          <div className='content-card-description'>
              <p>
								{description}
              </p>
          </div>
      </div>
  );
}

export default Card;