import React, { useState } from 'react';
import UtilsFunctions from '../../Utils/Utils.functions';
import { BsBack } from 'react-icons/bs';

import './styles.css';

import Logo from '../../Assets/logo.png';
import ModalFacet from '../ModalFacet';

function Sidebar({facet_subject, facet_secretary, facet_speaker}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();

  const handleSetModal = (data) => {
    setModalData(data);
    setModalVisible(true);
  }
  
  const newFacetSubject = UtilsFunctions.formatFacets('Assunto', facet_subject);
  const newFacetSecretary = UtilsFunctions.formatFacets('Secretário', facet_secretary);
  const newFacetSpeaker = UtilsFunctions.formatFacets('Palestrante', facet_speaker);

  return (
    <div className='container-sidebar'>
      <div className='content-logo'>
        <img src={Logo} alt="Logo" />
        <p>Busca de Documentos</p>
      </div>
      <div className='line'></div>
      <div className='content-sidebar-buttons'>
        <button onClick={() => handleSetModal(newFacetSubject)}>
          <p>Assunto ({newFacetSubject.data.length})</p>
          <BsBack />
        </button>
        <button onClick={() => handleSetModal(newFacetSecretary)}>
          <p>Secretário ({newFacetSecretary.data.length})</p>
          <BsBack />
        </button>
        <button onClick={() => handleSetModal(newFacetSpeaker)}>
          <p>Palestrante ({newFacetSpeaker.data.length})</p>
          <BsBack />
        </button>
      </div>
      {modalVisible ? <ModalFacet onclose={() => setModalVisible(false)} facetData={modalData} /> : null}
    </div>
  );
}

export default Sidebar;