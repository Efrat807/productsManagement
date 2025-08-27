
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductsList from './components/productsList/ProductsList'
import { store } from './app/store'
import { saveState } from './app/browserStorage'
import debounce from 'debounce'

function App() {
  store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsList />} />      
      </Routes>
    </BrowserRouter>
  )
}

export default App
