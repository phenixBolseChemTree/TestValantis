import './App.css';
import Header from './components/header';
import ProductStore from './components/productStore';
import SearchSortWidget from './components/searchSortWidget';

function App() {
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
