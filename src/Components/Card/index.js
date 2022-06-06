import React, { useContext, useState } from 'react';
import Context from '../../Contexts/context';
import { BsBack } from 'react-icons/bs';
import ModalDocument from '../ModalDocument';

import './styles.css';
import UtilsFunctions from '../../Utils/Utils.functions';

function Card({subject, secretary, file, description}) {

  const [ModalDocumentVisible, setModalDocumentVisible] = useState(false);
  const [context] = useContext(Context);
  const newFileName = file.slice(0, -5);

  let fullDescriptionWithHighlighting = UtilsFunctions.handleHighlightingDescription(file, context.highlighting, description);
  let descriptionWithHighlighting = UtilsFunctions.handleHighlightingDescription(file, context.highlighting, description);

  if (descriptionWithHighlighting.length > 200) {
		descriptionWithHighlighting = descriptionWithHighlighting.substring(0, 200) + '...';
	}

  return (
    <div className='container-card'>
      <div className='content-card-head'>
        <div>
          <div className='content-title'>
            <p style={{fontWeight: 'bold'}}>Arquivo:</p>
            <p>{newFileName}</p>
          </div>
          <div className='content-title'>
            <p style={{fontWeight: 'bold'}}>Assunto:</p>
            <p>{subject}</p>
          </div>
          <div className='content-title'>
            <p style={{fontWeight: 'bold'}}>Secretário:</p>
            <p>{secretary}</p>
          </div>
        </div>
        <button onClick={() => {setModalDocumentVisible(true)}}>
          <p>Abrir</p>
          <BsBack />
        </button>
      </div>
      <div className='content-card-description'>
        <p dangerouslySetInnerHTML={{ __html: descriptionWithHighlighting }}></p>
      </div>
      {ModalDocumentVisible ? <ModalDocument onclose={() => setModalDocumentVisible(false)} subject={subject} secretary={secretary} file={newFileName} description={fullDescriptionWithHighlighting}/> : null}
    </div>
  );
}

export default Card;