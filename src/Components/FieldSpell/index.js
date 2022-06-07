import React, { useContext } from 'react';
import Context from '../../Contexts/context';
import Api from '../../Services/Api';

import './styles.css';

function FieldSpell({word, freq, setSpell}) {

  const [context, setContext] = useContext(Context);

  word = word[0].toUpperCase() + word.substr(1);

  const handleSpellSubmit = async (word) => {
    const queryString = `&q=${word}&start=0`;
    let response = await Api.getSearchResults(queryString);
    setContext(
      {
        data: response.data.response,
        facets: response.data.facet_counts.facet_fields,
        highlighting: response.data.highlighting,
        filters: `Busca: ${word}`,
        queryString: queryString,
        search: context.search
      }
    );
    setSpell(undefined);
  }

  return (
      <p className='spell-word' onClick={() => handleSpellSubmit(word)}>{word} ({freq})</p>
  );
}

export default FieldSpell;