import { useEffect } from 'react';
import './App.css';
import Header from './components/header';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';
// import getData from './api/getData';
import getIDS from './api/getIDS';
import getITEMS from './api/getITEMS';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const params = { offset: 0, limit: 10 };
      const ids = await getIDS(params);
      console.log('ids log: ', ids.result); // Установка данных в состояние

      const items = await getITEMS(ids.result);
      console.log('items log: ', items); // Установка данных в состояние
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="Header-container">
        <Header />
      </div>
      <div className="SearchSortWidget-container">
        <SearchSortWidget />
      </div>
      <ProductStore />
    </div>
  );
}

export default App;
