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
						<p><b>Arquivo:</b> {file}</p>
						<p><b>Assunto:</b> {subject}</p>
						<p><b>Secretário:</b> {secretary}</p>
					</div>
					<div className='content-buttons-modal'>
						<button onClick={() => onclose()}>Fechar</button>
						<a href='https://blog.sajadv.com.br/jurisprudencia-e-advocacia/' target='_blank' rel='noreferrer'>Abrir em outra aba</a>
					</div>
				</div>
				<div className='content-modal-document'>
					<p className='content-description-modal' dangerouslySetInnerHTML={{ __html: description }}></p>
				</div>
			</div>
		</div>
  );
}

export default ModalDocument;