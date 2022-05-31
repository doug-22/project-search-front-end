import React from 'react';
import { BsSearch } from 'react-icons/bs';

import './styles.css';

function Modal({id = 'modal', onclose = () => {}, facetData}) {

	const handleOutsideClick = (ev) => {
		if(ev.target.id === id) onclose() }

	console.log(facetData)

  return (
    <div id={id} className='modal' onClick={handleOutsideClick}>
			<div className='container-modal'>
				<div className='content-modal'>
					<h3>Busca por facets | {facetData.facetTitle}</h3>
					<div className='content-buttons'>
						{facetData.data.map((item, key) => (
							<button className='facet-button' key={key}>
								<p>{item.title} ({item.amount})</p>
								<BsSearch />
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
  );
}

export default Modal;