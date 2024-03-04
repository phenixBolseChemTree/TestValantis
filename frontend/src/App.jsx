import { useEffect, useState } from 'react';
import './App.css';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';
import loadingImg from './img/loading.gif';
import postIDS from './api/postIDS';
import postITEMS from './api/postITEMS';
import postFILTER from './api/postFILTER';

const ITEMS_PER_PAGE = 50;

function App() {
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!input) {
        setLoading(true);
        const params = { offset: ITEMS_PER_PAGE * (activePage - 1), limit: ITEMS_PER_PAGE };
        const ids = await postIDS(params);
        const { result } = await postITEMS(ids.result);
        setItems(result);
      } else {
        const ids = await postFILTER(input);
        if (ids.result.length !== 0) {
          setLoading(true);
          const startSlice = ITEMS_PER_PAGE * (activePage - 1);
          const endSlice = startSlice + 50;
          const idsSlice = ids.result.slice(startSlice, endSlice);
          console.log('ids.result!!!', ids.result);
          console.log('idsSlice!!!', idsSlice);
          const { result } = await postITEMS(idsSlice);
          setItems(result);
        }
      }
      // setItems(result);
      setLoading(false);
    };

    fetchData();
  }, [activePage, input]);
  return (
    <div className="App">
      <div className="SearchSortWidget-container">
        <SearchSortWidget input={input} setInput={setInput} />
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
