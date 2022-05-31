import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { BsSearch } from 'react-icons/bs';

import Sidebar from '../../Components/Sidebar';
import Card from '../../Components/Card';
import Api from '../../Services/Api';

import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import UtilsFunctions from '../../Utils/Utils.functions';

function Home() {
  
  const [searchWithDates, setSearchWithDates] = useState(false);
  const [responseFacets, setResponseFacets] = useState();
  const [responseDocs, setResponseDocs] = useState();
  const [filters, setFilters] = useState('');
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();

  useEffect(() => {
    const loadApi = async () => {
      try {
        let response = await Api.getSearch();
        console.log(response);
        setResponseDocs(response.data.response.docs);
        setResponseFacets(response.data.facet_counts.facet_fields);
      } catch(error) {
        console.error(error);
      }
    };

    loadApi();
  }, []);


  const handleFilters = () => {
    setFilters('');
    setSearchWithDates(false);
  }

  const handleSubmit = async (values) => {
    console.log(values);
    if(values.toggleDate === true) {
      let newInitialDate = UtilsFunctions.formatDate(values.initialDate);
      let newFinalDate = UtilsFunctions.formatDate(values.finalDate);
      let response = await UtilsFunctions.handleSubmitType(values.type, values.term, values.toggleDate, newInitialDate, newFinalDate);
      console.log(response);
      setResponseDocs(response.data.response.docs);
      setResponseFacets(response.data.facet_counts.facet_fields);
      setFilters(`${values.type} | Busca: ${values.term} | ${newInitialDate} -> ${newFinalDate}`);
      return;
    }
    let response = await UtilsFunctions.handleSubmitType(values.type, values.term, values.toggleDate, values.initialDate, values.finalDate);
    console.log(response);
    setResponseDocs(response.data.response.docs);
    setResponseFacets(response.data.facet_counts.facet_fields);
    setFilters(`${values.type} | Busca: ${values.term}`);
  };

  const initialValues = {
    type: '',
    term: '',
    toggleDate: false,
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
                  <span>{filters}</span>
                  {filters !== '' &&
                    <button type='reset' className='button-reset-form'>LIMPAR FILTROS</button>
                  }
                </div>
              </Form>
            </Formik>
            
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