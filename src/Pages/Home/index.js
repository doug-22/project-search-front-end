import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { BsSearch } from 'react-icons/bs';

import Sidebar from '../../Components/Sidebar';
import Card from '../../Components/Card';

import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

function Home() {
  
  const [searchWithDates, setSearchWithDates] = useState(false);

  const handleSearchWithDates = (value) => {
    if(value.target.value !== 'Período entre fechas') {
      searchWithDates(false)
      return;
    }
    setSearchWithDates(true)
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    type: '',
    search: '',
    initialDate: '',
    finalDate: ''
  };



  return (
    <div className='container-home'>
      <Sidebar />
      <div className='content-cards'>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
          <div className='content-form'>
            <Field as='select' name='type' className='input' onClick={handleSearchWithDates}>
              <option value={null}>Campo específico</option>
              <option value={'Asunto'}>Asunto</option>
              <option value={'Nombre del archivo'}>Nombre del archivo</option>
              <option value={'Número de oficina'}>Número de oficina</option>
              <option value={'Organo radication'}>Organo radication</option>
              <option value={'Ponente'}>Ponente</option>
              <option value={'Secretario'}>Secretario</option>
              <option value={'Vocacion'}>Vocacion</option>
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
          <span>Teste</span>
        </div>
        
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Home;