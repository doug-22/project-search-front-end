import React from 'react';

import './styles.css';

function ModalDocument({id = 'modal-document', onclose = () => {}, subject, secretary, file, description}) {

	const handleOutsideClick = (ev) => {
	if(ev.target.id === id) onclose() }


  return (
    <div id={id} className='modal-document' onClick={handleOutsideClick}>
			<div className='container-modal-document'>
				<div className='content-head-modal'>
					<div>
						<p><b>Assunto:</b> {subject}</p>
						<p><b>Secretário:</b> {secretary}</p>
						<p><b>Arquivo:</b> {file}</p>
					</div>
					<a href='https://blog.sajadv.com.br/jurisprudencia-e-advocacia/' target='_blank' rel='noreferrer'>Abrir em outra aba</a>
				</div>
				<div className='content-modal-document'>
					<p className='content-description-modal'>{description}</p>
				</div>
			</div>
		</div>
  );
}

export default ModalDocument;