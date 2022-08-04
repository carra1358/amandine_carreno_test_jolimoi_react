import './App.css';
import AboutUs from './components/aboutUs/AboutUs';
import imgProducts from "./assets/beauty-products.avif"
import Search from './components/search/Search';

// Compling component
function App() {

  return (
    <div className="App" data-testid="app">
      <AboutUs img={imgProducts} msg={<>This is a page for<br />beauty product search</>} />
      <Search />
    </div>
  );
}

export default App;
