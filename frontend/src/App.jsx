import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';
import getIDS from './api/getIDS';
import getITEMS from './api/getITEMS';

const ITEMS_PER_PAGE = 50;

function App() {
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const params = { offset: ITEMS_PER_PAGE * (activePage - 1), limit: ITEMS_PER_PAGE };
      const ids = await getIDS(params);
      console.log('ids log: ', ids.result);

      const itemsData = await getITEMS(ids.result);
      const { result } = itemsData;
      // console.log('result12', result);
      console.log('items log: ', itemsData);

      setItems(result);
    };

    fetchData();
  }, [activePage]);
  return (
    <div className="App">
      <div className="Header-container">
        <Header />
      </div>
      <div className="SearchSortWidget-container">
        {/* {JSON.stringify(items)} */}
        <SearchSortWidget />
      </div>
      <ProductStore
        items={items}
        setItems={setItems}
        setActivePage={setActivePage}
        activePage={activePage}
      />
    </div>
  );
}

export default App;
