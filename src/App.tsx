
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductsList from './components/productsList/ProductsList'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsList />} />      
      </Routes>
    </BrowserRouter>
  )
}

export default App
