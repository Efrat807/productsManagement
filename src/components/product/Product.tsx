import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteProduct } from "../../features/productsList/productsSlice";
import type { IProduct } from "../../types";
import defaultImage from '../../assets/defaultImage.png'
import { setSelectedProduct } from "../../features/selectedProduct/selectedProductSlice";
import './Product.css'

const Product = ({product}: {product: IProduct}) => {
    const dispatch = useAppDispatch();
    const selectedProduct = useAppSelector(state => state.selectedProduct);    
    const color = product.id === selectedProduct?.id ? 'lightblue' : 'white';

    return(<div>
        {product ? (
            <div className="productCard"  style={{backgroundColor: color}}>
                <img className="img" src={defaultImage} alt={product.name} />
                <div className="productInfo" onClick={() => dispatch(setSelectedProduct(product))}>
                    <h3 className="productName">{product.name}</h3>
                    <p className="description">{product.description}</p>
                </div>
                <button className="deleteBtn" 
                onClick={() => {
                    if (product.id === selectedProduct?.id) {
                        dispatch(setSelectedProduct(null));
                    }
                    dispatch(deleteProduct(product.id!))
                    
                }}>Delete</button>
                
            </div>
        ) : (
            <p>Product not found</p>
        )}
    </div>)
}

export default Product;