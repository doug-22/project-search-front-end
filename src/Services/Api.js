import Axios from 'axios';

const Api = Axios.create({
  baseURL: 'http://localhost:8983/solr/mexico'
});

// eslint-disable-next-line
export default {
  getSearch: async (term) => {
    if(term === undefined) {
      let response = await Api.get('/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=*:*&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json');
      return response;
    }else {
      let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=${term}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`);
      return response;
    } 
  },
  getSpecificSearch: async (type, term) => {
    let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=${type}:${term}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`)
    return response;
  },
  getSpecificSearchTimeRange: async (type, term, initialDate, finalDate) => {
    let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&fq=fechaResolucion:[${initialDate}T05:00:00Z%20TO%20${finalDate}T05:00:00Z]&q=${type}:${term}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`);
    return response;
  },
  getSearchTimeRange: async (term, initialDate, finalDate) => {
    let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&fq=fechaResolucion:[${initialDate}T05:00:00Z%20TO%20${finalDate}T05:00:00Z]&q=${term}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`);
    return response;
  },
  getFacetSearch: async (queryString) => {
    if(queryString.includes('&q=')){
      let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on${queryString}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`);
      return response;
    }
    let response = await Api.get(`/select?facet.field=tipoAsunto_facet&facet.field=secretario_facet&facet.field=ponente_facet&facet=on&q=*:*${queryString}&fl=*&hl.fl=data_file&hl.snippets=10&hl=on&wt=json`);
    return response;
  }
};