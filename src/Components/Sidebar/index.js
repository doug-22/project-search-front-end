import React from 'react';
import UtilsFunctions from '../../Utils/Utils.functions';
import { BsBack } from 'react-icons/bs';

import './styles.css';

import Logo from '../../Assets/logo.png';

function Sidebar({facet_subject, facet_secretary, facet_speaker}) {
  
  const newFacetSubject = UtilsFunctions.formatFacets(facet_subject);
  const newFacetSecretary = UtilsFunctions.formatFacets(facet_secretary);
  const newFacetSpeaker = UtilsFunctions.formatFacets(facet_speaker);

  return (
    <div className='container-sidebar'>
      <div className='content-logo'>
        <img src={Logo} alt="Logo" />
        <p>Busca de Documentos</p>
      </div>
      <div className='line'></div>
      <div className='content-sidebar-buttons'>
        <button>
          <p>Assunto ({newFacetSubject.length})</p>
          <BsBack />
        </button>
        <button>
          <p>Secretário ({newFacetSecretary.length})</p>
          <BsBack />
        </button>
        <button>
          <p>Palestrante ({newFacetSpeaker.length})</p>
          <BsBack />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;