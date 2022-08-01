import './App.css';
import AboutUsView from './features/aboutUs/AboutUsView';
import imgProducts from "./assets/beauty-products.jpeg"
import SearchView from './features/search/SearchView';

function App() {

  return (
    <div className="App">
      <AboutUsView img={imgProducts} msg={<>this is a page for<br />beauty product search</>} />
      <SearchView />
    </div>
  );
}

export default App;
