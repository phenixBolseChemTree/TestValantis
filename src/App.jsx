import { useEffect, useState } from 'react';
import './App.css';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';
import loadingImg from './img/loading.gif';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import postAPIValantis from './api/postAPIValantis';

const ITEMS_PER_PAGE = 50;

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const hasNoCyrillic = (str) => !/[\u0400-\u04FF]/.test(str);

const notifyNothing = () =>
  toast.error('Ничего не найдено 😢', {
    position: 'bottom-right',
    autoClose: 3000,
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
        const ids = await postAPIValantis('get_ids', paramsCastome); // может вернуть пустой {result: []}
        const params = { ids: ids.result };
        const { result } = await postAPIValantis('get_items', params);
        if (result.length !== 0) {
          setItems(filterUniqueById(result));
        } else {
          notifyNothing();
        }
      } else {
        let ids;
        setLoading(true);

        if (isNumeric(input)) {
          ids = await postAPIValantis('filter', { price: Number(input) }); // params: { [inputKey]: input }
        } else if (hasNoCyrillic(input)) {
          ids = await postAPIValantis('filter', { brand: input });
        } else {
          ids = await postAPIValantis('filter', { product: input });
        }
        if (ids.result.length !== 0) {
          // setLoading(true);
          const startSlice = ITEMS_PER_PAGE * (activePage - 1); // 1 - 1 = 0
          const endSlice = startSlice + 50;
          const idsSlice = ids.result.slice(startSlice, endSlice);
          // console.log('!!!activePage', activePage);
          // console.log('!!!startSlice', startSlice);
          // console.log('!!!ids', ids);
          // console.log('!!!idsSlice', idsSlice);
          // console.log('!!!input', input);
          // const { result } = await postITEMS(idsSlice);
          const params = { ids: idsSlice };
          const { result } = await postAPIValantis('get_items', params);
          if (result.length !== 0) {
            setItems(filterUniqueById(result));
          } else {
            notifyNothing();
          }
        } else {
          notifyNothing();
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [activePage, input]);

  useEffect(() => {
    // setActivePage(1);
    setActivePage(1);
    console.log('изменился INPUT!!!!!');
  }, [input]);

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
          input={input}
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
