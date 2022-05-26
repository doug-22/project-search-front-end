import Axios from 'axios';

const Api = Axios.create({
  baseURL: 'http://localhost:8983/solr/mexico'
});

// eslint-disable-next-line
export default {
  getSearch: async (term) => {
    if(term === undefined) {
      let response = await Api.get('/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=*:*&fl=*&wt=json');
      return response;
    }else {
      let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=${term}&fl=*&wt=json`);
      return response;
    } 
  },
  getSpecificSearch: async (type, term) => {
    let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=${type}:${term}&fl=*&wt=json`)
    return response;
  }
};