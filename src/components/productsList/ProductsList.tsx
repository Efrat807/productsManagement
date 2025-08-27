import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddAndEditProduct from "../addAndEditProduct/AddAndEditProduct";
import Product from "../product/Product";
import { resetSelectedProduct } from "../../features/selectedProduct/selectedProductSlice";
import './ProductsList.css'
import { use, useMemo, useState } from "react";

const ProductsList = () => {
    const products = useAppSelector(state => state.products);
    const selectedProduct = useAppSelector(state => state.selectedProduct);
    const [showDetails, setShowDetails] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [searchProduct, setSearchProduct] = useState('');
    const dispatch = useAppDispatch();
    
    const sortedProducts = useMemo(()=> [...products].sort((a, b) => {
        if (sortBy === 'name') {    
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'date') {
            return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
        }
        return 0;
    }), [products, sortBy]);

    const filteredAndSortedProducts = useMemo(() => {
        return sortedProducts.filter(product => 
            product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
            product.description.toLowerCase().includes(searchProduct.toLowerCase())
        );
    }, [searchProduct, sortedProducts]);

    return (
        <>
            <h1 className="header">My Store</h1>
            <div className="ProductsListBody">

            <div className="productsContainer">
                <div className="topBar">
                    <button className="addProductBtn" onClick={()=>{
                        dispatch(resetSelectedProduct());
                        setShowDetails(true);
                    }}>+ Add</button>
                    <input 
                        className="searchInput" 
                        type="text" 
                        placeholder="Search products" 
                        onChange={(e)=> setSearchProduct(e.target.value)} 
                    />
                    <div>
                        <label className="sortLbl">Sort by:</label>
                        <select className="sortSelect" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                            <option value="name">name</option>
                            <option value="date">recently added</option>
                        </select>
                    </div>
                </div>
                <div className="productsList">
                    {filteredAndSortedProducts.map(product => (
                        <Product key={product.id} product={product}/>
                    ))}
                </div>
                
            </div>
            {(selectedProduct || showDetails) && <AddAndEditProduct /> }
        </div>
        </>
    )
}
export default ProductsList;