import Axios from 'axios';

const Api = Axios.create({
  baseURL: 'http://localhost:8983/solr/mexico'
});

// eslint-disable-next-line
export default {
  getSearchResults: async (queryString) => {
    if(queryString.includes('&q=')){
      let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on${queryString}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`);
      return response;
    }
    let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=*:*${queryString}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`);
    return response;
  }
};