import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { BsSearch } from 'react-icons/bs';

import Sidebar from '../../Components/Sidebar';
import Card from '../../Components/Card';
import Api from '../../Services/Api';

import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

function Home() {
  
  const [searchWithDates, setSearchWithDates] = useState(false);
  const [responseFacets, setResponseFacets] = useState();
  const [responseDocs, setResponseDocs] = useState();
  const [filters, setFilters] = useState('');

  useEffect(() => {
    const loadApi = async () => {
      try {
        let response = await Api.getSearch();
        console.log(response)
        setResponseDocs(response.data.response.docs);
        setResponseFacets(response.data.facet_counts.facet_fields);
      } catch(error) {
        console.error(error);
      }
    };

    loadApi();
  }, []);
  

  const handleSearchWithDates = (value) => {
    if(value.target.value !== 'Período entre fechas') {
      setSearchWithDates(false)
      return;
    }
    setSearchWithDates(true)
  };

  const handleSubmit = async (values) => {
    console.log(values);
    if( values.type.length === 0 && values.search.length !== 0 && values.initialDate.length === 0 && values.finalDate.length === 0 ) {
      let response = await Api.getSearch(values.search);
      console.log(response)
      setResponseDocs(response.data.response.docs);
      setResponseFacets(response.data.facet_counts.facet_fields);

      setFilters(`busca: ${values.search}`);

    }else if ( values.type.length !== 0 && values.search.length !== 0 && values.initialDate.length === 0 && values.finalDate.length === 0 ) {
      let response = await Api.getSpecificSearch(values.type, values.search);
      console.log(response);
      setResponseDocs(response.data.response.docs);
      setResponseFacets(response.data.facet_counts.facet_fields);

      setFilters(`${values.type} | busca: ${values.search}`);
      
    }
  };

  const initialValues = {
    type: '',
    search: '',
    initialDate: '',
    finalDate: ''
  };


  console.log(responseDocs)
  console.log(responseFacets)

  return (
    <>
      {responseFacets &&
        <div className='container-home'>
          <Sidebar facet_subject={responseFacets.tipoAsunto_facet} facet_secretary={responseFacets.secretario_facet} facet_speaker={responseFacets.ponente_facet} />
          <div className='content-cards'>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <Form>
              <div className='content-form'>
                <Field as='select' name='type' className='input' onClick={handleSearchWithDates}>
                  <option value={null}>Campo específico</option>
                  <option value={'tipoAsunto'}>Asunto</option>
                  <option value={'nome_arquivo'}>Nombre del archivo</option>
                  <option value={'numExpediente'}>Número de oficina</option>
                  <option value={'organoRadicacion'}>Organo radication</option>
                  <option value={'ponente'}>Ponente</option>
                  <option value={'secretario'}>Secretario</option>
                  <option value={'votacion'}>Votacion</option>
                  <option value={'Archivo de datos'}>Archivo de datos</option>
                  <option value={'Período entre fechas'}>Período entre fechas</option>
                </Field>
                <Field name='search' type='text' placeholder='Pesquisar' className='input'/>
                <button type='submit' className='button-form-search'>
                  <BsSearch />
                </button>
              </div>
              {searchWithDates && 
                <div className='content-form-date'>
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
                            onChange={(date) => setFieldValue('initialDate', date)}
                            placeholderText='Selecione da data inicial'
                            dateFormat='dd/MM/yyyy'
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
                            onChange={(date) => setFieldValue('finalDate', date)}
                            placeholderText='Selecione da data final'
                            dateFormat='dd/MM/yyyy'
                          />
                        );
                      }}
                    </Field>
                  </div>
                </div>
              }
              </Form>
            </Formik>
            <div className='content-filters'>
              <span><b>Filtros:</b></span>
              <span>{filters}</span>
            </div>

            
            {responseDocs &&
              responseDocs.map((item, key) => (
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