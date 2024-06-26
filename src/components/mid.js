import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal';

function Mid() {
  const [inputText, setInputText] = useState('');
  const [predictions, setPredictions] = useState({});
  const [predictions1, setPredictions1] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalopen, setModalOpen] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://subtle-mite-neutral.ngrok-free.app/predict', {
        text: inputText, // Envía el texto como parte del objeto JSON
      }, {
        headers: {
          'Content-Type': 'application/json', // Establece el tipo de contenido a JSON
        },
      });

      setPredictions(response.data); // Asume que la respuesta del servidor es JSON
    } catch (error) {
      setError('Hubo un problema al realizar la solicitud');
    } finally {
      setLoading(false);
    }


    setLoading(true);
    try {
      const response = await axios.post('https://subtle-mite-neutral.ngrok-free.app/predict_scikit', {
        text: inputText, // Envía el texto como parte del objeto JSON
      }, {
        headers: {
          'Content-Type': 'application/json', // Establece el tipo de contenido a JSON
        },
      });

      setPredictions1(response.data); // Asume que la respuesta del servidor es JSON
    } catch (error) {
      setError('Hubo un problema al realizar la solicitud');
    } finally {
      setLoading(false);
    }








  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };


  useEffect(() => {
    if (predictions && Object.keys(predictions).length > 0) {
      setModalOpen(true); // Abre el modal cuando las predicciones están disponibles y no están vacías
    }
  }, [predictions]);


return (
    <div className='container mx-auto px-4 sm:px-8 lg:px-12'>
      <div className='flex flex-col sm:flex-row justify-center items-center h-full m-14'>

        <div className='mb-8 sm:mb-0 sm:mr-[60px] sm:max-w-[580px]'>
          <h1 className='mb-4 text-center sm:text-left text-3xl sm:text-4xl leading-relaxed'>
            ¿Qué es Sentimeter?
          </h1>

          <p className='mb-4 text-center sm:text-left sm:w-[580px] w-full'>
            SentiMeter es la DEMO de una página diseñada para clasificar textos y realizar un análisis de sentimientos detallado. 
          </p>
          <p className='mb-4 text-center sm:text-left sm:w-[580px] w-full'>
            Utilizamos avanzadas técnicas de procesamiento de lenguaje natural (NLP) y aprendizaje automático para identificar y evaluar las emociones y opiniones expresadas en las reseñas de tus productos.
          </p>

          <p className='mb-4 text-center sm:text-left sm:w-[580px] w-full text-xl sm:text-xl'>
            <br />
            Prueba la DEMO introduciendo una Review:
          </p>
        </div>

        <div className='flex flex-col items-center sm:ml-10 '>
          <div>
            <div className='flex flex-col items-center justify-center p-2 bg-white border border-black border-opacity-5 rounded-lg w-[500px] h-[250px] shadow-lg'>
              <textarea
                value={inputText}
                onChange={handleInputChange}
                className='border-black border-2 rounded-lg w-[440px] h-[150px] p-2 resize-none'
                placeholder='Escribe tu texto aquí...'
              ></textarea>

              <button
                onClick={() => {
                  handlePredict();
                  setModalOpen(true);
                }}
                disabled={loading || inputText.trim().length === 0}
                className='mr-2 px-4 py-2 mt-3  text-black bg-green-500 border-black border-opacity-0 rounded-lg shadow-md hover:bg-amber-600 focus:outline-none transition duration-300'
              >
                {loading ? 'Cargando...' : '¡Analizar!'}


              </button>
                
              {isModalopen && (
  <Modal onClose={() => setModalOpen(false)}>
    <h2>Calificación:</h2>
    <p>{predictions.prediction}</p>

    <ul>
      <li style={{ marginBottom: '5px' }}><strong><br />BERT:</strong> {predictions.prediction} {predictions.confidence ? `${(predictions.confidence * 100).toFixed(4)}%` : 'cargando...'}</li>
      <li style={{ marginBottom: '5px' }}><strong>Naive Bayes:</strong> {predictions1['MultinomialNB'] ? predictions1['MultinomialNB'].prediction : '-'} {predictions1['MultinomialNB'] ? `${(predictions1['MultinomialNB'].confidence * 100).toFixed(4)}%` : 'cargando...'}</li>
      <li style={{ marginBottom: '5px' }}><strong>Random Forest:</strong> {predictions1['RandomForestd_50'] ? predictions1['RandomForestd_50'].prediction : '-'} {predictions1['RandomForestd_50'] ? `${(predictions1['RandomForestd_50'].confidence * 100).toFixed(4)}%` : 'cargando...'}</li>
      <li><strong>Regresión Logística:</strong> {predictions1['RegresionLogistica'] ? predictions1['RegresionLogistica'].prediction : '-'} {predictions1['RegresionLogistica'] ? `${(predictions1['RegresionLogistica'].confidence * 100).toFixed(4)}%` : 'cargando...'}</li>
    </ul>
  </Modal>
)}
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mid;
