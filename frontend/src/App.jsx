import { useEffect, useState } from 'react';
import './App.css';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';
import postIDS from './api/postIDS';
import loadingImg from './img/loading.gif';
import postITEMS from './api/postITEMS';

const ITEMS_PER_PAGE = 50;

function App() {
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = { offset: ITEMS_PER_PAGE * (activePage - 1), limit: ITEMS_PER_PAGE };
      const ids = await postIDS(params);
      // console.log('ids log: ', ids.result);

      const itemsData = await postITEMS(ids.result);
      const { result } = itemsData;
      // console.log('items log: ', itemsData);

      setItems(result);
      setLoading(false);
    };

    fetchData();
  }, [activePage]);
  return (
    <div className="App">
      <div className="SearchSortWidget-container">
        <SearchSortWidget />
      </div>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img className="loadingImg" style={{ width: '70px' }} src={loadingImg} alt="loading" />
        </div>
      )}

      <div className="productStoreContainer">
        <ProductStore
          items={items}
          setItems={setItems}
          setActivePage={setActivePage}
          activePage={activePage}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

export default App;
