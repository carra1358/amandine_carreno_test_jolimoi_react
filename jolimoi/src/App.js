import './App.css';
import AboutUsView from './components/aboutUs/AboutUs';
import imgProducts from "./assets/beauty-products.jpeg"
import SearchView from './components/search/Search';

// Compling component
function App() {

  return (
    <div className="App" data-testid="app">
      <AboutUsView img={imgProducts} msg={<>This is a page for<br />beauty product search</>} />
      <SearchView />
    </div>
  );
}

export default App;
