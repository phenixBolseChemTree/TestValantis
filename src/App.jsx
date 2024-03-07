import { useEffect, useState } from 'react';
import './App.css';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';
import loadingImg from './img/loading.gif';
import postIDS from './api/postIDS';
import postITEMS from './api/postITEMS';
import postFILTER from './api/postFILTER';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 50;

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const hasNoCyrillic = (str) => !/[\u0400-\u04FF]/.test(str);

const notifyNothing = () =>
  toast.error('Ничего не найдено 😢', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce
  });
const filterUniqueById = (array) => {
  return array.filter((obj, index, self) => {
    const firstIndex = self.findIndex((item) => item.id === obj.id);
    return index === firstIndex;
  });
};

function App() {
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!input) {
        setLoading(true);
        const paramsCastome = { offset: ITEMS_PER_PAGE * (activePage - 1), limit: ITEMS_PER_PAGE };
        const ids = await postIDS(paramsCastome);
        const { result } = await postITEMS(ids.result);

        setItems(filterUniqueById(result));
      } else {
        let ids;
        setLoading(true);

        if (isNumeric(input)) {
          ids = await postFILTER(Number(input), 'price');
        } else if (hasNoCyrillic(input)) {
          ids = await postFILTER(input, 'brand');
        } else {
          ids = await postFILTER(input, 'product');
        }
        if (ids.result.length !== 0) {
          // setLoading(true);
          const startSlice = ITEMS_PER_PAGE * (activePage - 1);
          const endSlice = startSlice + 50;
          const idsSlice = ids.result.slice(startSlice, endSlice);
          const { result } = await postITEMS(idsSlice);
          setItems(filterUniqueById(result));
        } else {
          notifyNothing();
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [activePage, input]);

  // если ничего не найдено то нужно выводить сообщение об этом через tostyfy
  // useEffect(() => {
  //   if (!loading) {
  //     toast('🦄 Wow so easy!', {
  //       position: 'top-right',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //       transition: Bounce
  //     });
  //   }
  // }, loading);
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
      <ToastContainer />
    </div>
  );
}

export default App;
