import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { BsSearch } from 'react-icons/bs';
import Context from '../../Contexts/context';

import Sidebar from '../../Components/Sidebar';
import Card from '../../Components/Card';
import Api from '../../Services/Api';

import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import UtilsFunctions from '../../Utils/Utils.functions';

function Home() {

  const [context, setContext] = useContext(Context);
  const [searchWithDates, setSearchWithDates] = useState(false);
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();

  useEffect(() => {
    const loadApi = async () => {
      try {
        let response = await Api.getSearch();
        setContext(
          {
            data: response.data.response.docs,
            facets: response.data.facet_counts.facet_fields,
            filters: '',
            queryString: '',
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
  }, []);


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
      let response = await UtilsFunctions.handleSubmitType(values.type, values.term, values.toggleDate, newInitialDate, newFinalDate);
      setContext(
        {
          data: response.data.response.docs,
          facets: response.data.facet_counts.facet_fields,
          filters: values.type.length === 0 ? `Busca: ${values.term} | ${newInitialDate} -> ${newFinalDate}` : `${values.type} | Busca: ${values.term} | ${newInitialDate} -> ${newFinalDate}`,
          queryString: values.type.length === 0 ? `&fq=fechaResolucion:[${newInitialDate}T05:00:00Z%20TO%20${newFinalDate}T05:00:00Z]&q=${values.term}` : `&fq=fechaResolucion:[${newInitialDate}T05:00:00Z%20TO%20${newFinalDate}T05:00:00Z]&q=${values.type}:${values.term}`,
          search: values
        }
      );
      return;
    }
    let response = await UtilsFunctions.handleSubmitType(values.type, values.term, values.toggleDate, values.initialDate, values.finalDate);
    setContext(
      {
        data: response.data.response.docs,
        facets: response.data.facet_counts.facet_fields,
        filters: values.type.length === 0 ? `Busca: ${values.term}` : `${values.type} | Busca: ${values.term}`,
        queryString: values.type.length === 0 ? `&q=${values.term}` : `&q=${values.type}:${values.term}`,
        search: values
      }
    );
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
          <Sidebar />
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
            
            {context.data &&
              context.data.map((item, key) => (
                <Card key={key} subject={item.tipoAsunto} secretary={item.secretario} file={item.nome_arquivo} description={item.data_file} />
              ))
            }

          </div>
        </div>
      }
    </>
  );
}

export default Home;