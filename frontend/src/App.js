import './App.css';
import Header from './components/header';
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
    </div>
  );
}

export default App;
