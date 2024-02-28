import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';
import getIDS from './api/getIDS';
import getITEMS from './api/getITEMS';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = { offset: 0, limit: 15 };
      const ids = await getIDS(params);
      console.log('ids log: ', ids.result); // Установка данных в состояние

      const itemsData = await getITEMS(ids.result);
      const { result } = itemsData;
      console.log('result12', result);
      console.log('items log: ', itemsData); // Установка данных в состояние

      setItems(result);
    };

    fetchData();

    // console.log('результат fetch data', w);
  }, []);
  return (
    <div className="App">
      <div className="Header-container">
        <Header />
      </div>
      <div className="SearchSortWidget-container">
        {/* {JSON.stringify(items)} */}
        <SearchSortWidget />
      </div>
      <ProductStore items={items} />
    </div>
  );
}

export default App;
