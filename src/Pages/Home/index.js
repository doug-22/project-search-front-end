import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import Context from '../../Contexts/context';
import Api from '../../Services/Api';
import UtilsFunctions from '../../Utils/Utils.functions';

import Sidebar from '../../Components/Sidebar';
import Card from '../../Components/Card';
import Pagination from '../../Components/Pagination';

import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BsSearch } from 'react-icons/bs';

const LIMIT = 10;

function Home() {

  const [context, setContext] = useContext(Context);
  const [searchWithDates, setSearchWithDates] = useState(false);
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadApi = async () => {
      try {
        let indexString = context.queryString.indexOf('&start=');
        let subQuery = context.queryString.substr(indexString);
        const queryString = context.queryString.replace(subQuery, `&start=${offset}`);
        let response = await Api.getSearchResults(queryString);
        setContext(
          {
            data: response.data.response,
            facets: response.data.facet_counts.facet_fields,
            highlighting: response.data.highlighting,
            filters: context.filters,
            queryString: queryString,
            search: {
              type: '',
              term: '',
              toggleDate: false,
              initialDate: '',
              finalDate: ''
          }
          }
        );
      } catch(error) {
        console.error(error);
      }
    };

    loadApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);


  const handleFilters = () => {
    setContext({
      data: context.data,
      facets: context.facets,
      filters: '',
      queryString: '',
      search: context.search
    });
    setSearchWithDates(false);
  }

  const handleSubmit = async (values) => {    
    if(values.toggleDate === true) {
      let newInitialDate = UtilsFunctions.formatDate(values.initialDate);
      let newFinalDate = UtilsFunctions.formatDate(values.finalDate);
      const queryString = UtilsFunctions.handleQueryString(values.type, values.term, values.toggleDate, newInitialDate, newFinalDate);
      let response = await Api.getSearchResults(queryString);
      setContext(
        {
          data: response.data.response,
          facets: response.data.facet_counts.facet_fields,
          highlighting: response.data.highlighting,
          filters: (values.type.length === 0 || values.type === 'Campo específico') ? `Busca: ${values.term} | ${newInitialDate} -> ${newFinalDate}` : `${values.type} | Busca: ${values.term} | ${newInitialDate} -> ${newFinalDate}`,
          queryString: queryString,
          search: values
        }
      );
      setOffset(0);
      return;
    }

    const queryString = UtilsFunctions.handleQueryString(values.type, values.term, values.toggleDate, values.initialDate, values.finalDate);
    console.log(queryString)
    let response = await Api.getSearchResults(queryString);
    setContext(
      {
        data: response.data.response,
        facets: response.data.facet_counts.facet_fields,
        highlighting: response.data.highlighting,
        filters: (values.type.length === 0 || values.type === 'Campo específico') ? `Busca: ${values.term}` : `${values.type} | Busca: ${values.term}`,
        queryString: queryString,
        search: values
      }
    );
    setOffset(0);
  };

  const initialValues = {
    type: '',
    term: '',
    toggleDate: false,
    initialDate: '',
    finalDate: ''
  };

  return (
    <>
      {context.facets &&
        <div className='container-home'>
          <Sidebar setOffset={setOffset} />
          <div className='content-cards'>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onReset={handleFilters}
            >
              <Form>
                <div className='content-form'>
                  <Field as='select' name='type' className='input'>
                    <option value={null}>Campo específico</option>
                    <option value={'tipoAsunto'}>Asunto</option>
                    <option value={'nome_arquivo'}>Nombre del archivo</option>
                    <option value={'numExpediente'}>Número de oficina</option>
                    <option value={'organoRadicacion'}>Organo radication</option>
                    <option value={'ponente'}>Ponente</option>
                    <option value={'secretario'}>Secretario</option>
                    <option value={'votacion'}>Votacion</option>
                    <option value={'Archivo de datos'}>Archivo de datos</option>
                  </Field>
                  <Field name='term' type='text' placeholder='Pesquisar' className='input'/>
                  <button type='submit' className='button-form-search'>
                    <BsSearch />
                  </button>
                </div>
                
                <div className='content-form-date'>
                  <div className='input-date'>
                    <label>Inserir datas:</label>
                    <Field name='toggleDate' type='checkbox' onClick={(ev) => setSearchWithDates(ev.target.checked)}/>
                  </div>
                  {searchWithDates && 
                    <>
                      <div className='input-date'>
                        <label>Data inicial:</label>
                        <Field name="initialDate">
                          {({form, field}) => {
                            const {setFieldValue} = form
                            const { value } = field
                            return (
                              <DatePicker
                                id="initialDate"
                                selected={value}
                                onChange={(date) => {setFieldValue('initialDate', date); setInitialDate(date)}}
                                placeholderText='Selecione da data inicial'
                                dateFormat='dd/MM/yyyy'
                                selectsStart
                                startDate={initialDate}
                                endDate={finalDate}
                              />
                            );
                          }}
                        </Field>
                      </div>
                      <div className='input-date'>
                        <label>Data final:</label>
                        <Field name="finalDate">
                          {({form, field}) => {
                            const {setFieldValue} = form
                            const { value } = field
                            return (
                              <DatePicker
                                id="finalDate"
                                selected={value}
                                onChange={(date) => {setFieldValue('finalDate', date); setFinalDate(date)}}
                                placeholderText='Selecione da data final'
                                dateFormat='dd/MM/yyyy'
                                selectsEnd
                                startDate={initialDate}
                                endDate={finalDate}
                                minDate={initialDate}
                              />
                            );
                          }}
                        </Field>
                      </div>
                    </>
                    }
                </div>
                <div className='content-filters'>
                  <span><b>Filtros:</b></span>
                  <span>{context.filters}</span>
                  {context.filters !== '' &&
                    <button type='reset' className='button-reset-form'>LIMPAR FILTROS</button>
                  }
                </div>
              </Form>
            </Formik>
            <div className='container-pagination-results'>
              <p>{context.data.numFound} Resultados | Página {offset ? offset / LIMIT + 1 : 1} de {Math.ceil(context.data.numFound / LIMIT)} </p>
            </div>
            {context.data.docs &&
              context.data.docs.map((item, key) => (
                <Card key={key} subject={item.tipoAsunto} secretary={item.secretario} file={item.nome_arquivo} description={item.data_file} />
              ))
            }

            {context.data.docs.length > 0 && (
              <Pagination limit={LIMIT} total={context.data.numFound} offset={offset} setOffset={setOffset} />
              )
            }

          </div>
        </div>
      }
    </>
  );
}

export default Home;