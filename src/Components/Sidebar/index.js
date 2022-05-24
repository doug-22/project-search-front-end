import React from 'react';
import { BsBack } from 'react-icons/bs';

import './styles.css';

import Logo from '../../Assets/logo.png';

function Sidebar() {
  return (
      <div className='container-sidebar'>
          <div className='content-logo'>
              <img src={Logo} alt="Logo" />
              <p>Busca de Documentos</p>
          </div>
          <div className='line'></div>
          <div className='content-sidebar-buttons'>
              <button>
                  <p>Assunto</p>
                  <BsBack />
              </button>
              <button>
                  <p>Secretário</p>
                  <BsBack />
              </button>
              <button>
                  <p>Palestrante</p>
                  <BsBack />
              </button>
          </div>
      </div>
  );
}

export default Sidebar;