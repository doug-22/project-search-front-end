import React, { useContext, useState } from 'react';
import UtilsFunctions from '../../Utils/Utils.functions';
import { BsBack } from 'react-icons/bs';
import Context from '../../Contexts/context';

import './styles.css';

import Logo from '../../Assets/logo.png';
import ModalFacet from '../ModalFacet';

function Sidebar() {

  const [context] = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();

  const handleSetModal = (data) => {
    setModalData(data);
    setModalVisible(true);
  }
  
  const newFacetSubject = UtilsFunctions.formatFacets('Assunto', 'tipoAsunto', context.facets.tipoAsunto_facet);
  const newFacetSecretary = UtilsFunctions.formatFacets('Secretário', 'secretario',context.facets.secretario_facet);
  const newFacetSpeaker = UtilsFunctions.formatFacets('Palestrante', 'ponente', context.facets.ponente_facet);

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