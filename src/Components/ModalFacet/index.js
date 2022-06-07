import React, { useContext } from 'react';
import Api from '../../Services/Api';
import Context from '../../Contexts/context';
import { BsSearch } from 'react-icons/bs';

import './styles.css';

function Modal({id = 'modal', onclose = () => {}, facetData, setOffset}) {

	const [context, setContext] = useContext(Context);

	const handleOutsideClick = (ev) => {
		if(ev.target.id === id) onclose()
	}

	const handleFacetSubmit = async (type, term) => {
		let queryStringAux = context.queryString.includes(`&fq=${type}:"${term}"`) ? context.queryString : `&fq=${type}:"${term}"${context.queryString}`;
		let indexString = queryStringAux.indexOf('&start=');
		let subQuery = queryStringAux.substr(indexString);
		const queryString = queryStringAux.replace(subQuery, `&start=0`);

		if(context.search.toggleDate === true) {
			let response = await Api.getSearchResults(queryString);
			setContext(
				{
					data: response.data.response,
					facets: response.data.facet_counts.facet_fields,
					highlighting: response.data.highlighting,
					filters: context.filters.includes(`${type}: "${term}"`) ? context.filters : (context.filters.length === 0 ? `${type}: "${term}"` : `${context.filters} | ${type}: "${term}"`),
					queryString: queryString,
					search: {
						type: type,
						term: `"${term}"`,
						toggleDate: context.search.toggleDate,
						initialDate: context.search.initialDate,
						finalDate: context.search.finalDate
					}
				}
			);
			onclose();
			setOffset(0)
			return;
		}
		let response = await Api.getSearchResults(queryString);
		setContext(
      {
        data: response.data.response,
        facets: response.data.facet_counts.facet_fields,
				highlighting: response.data.highlighting,
        filters: context.filters.includes(`${type}: "${term}"`) ? context.filters : (context.filters.length === 0 ? `${type}: "${term}"` : `${context.filters} | ${type}: "${term}"`),
				queryString: queryString,
				search: {
					type: type,
					term: `"${term}"`,
					toggleDate: false,
					initialDate: context.search.initialDate,
					finalDate: context.search.finalDate
				}
      }
    );
		onclose();
		setOffset(0);
	}


  return (
    <div id={id} className='modal' onClick={handleOutsideClick}>
			<div className='container-modal'>
				<h3>Busca por facets | {facetData.facetTitle}</h3>
				<div className='content-modal'>
					<div className='content-buttons'>
						{facetData.data.map((item, key) => {
							let newTitle = item.title.length > 100 ? item.title.substring(0, 100) + '...' : item.title;
							return (
								<button className='facet-button' key={key} onClick={() => handleFacetSubmit(facetData.facetType, item.title)}>
									<p>{newTitle} ({item.amount})</p>
									<BsSearch />
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
  );
}

export default Modal;