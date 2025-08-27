import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProduct, updateProduct } from "../../features/productsList/productsSlice";
import { setSelectedProduct } from "../../features/selectedProduct/selectedProductSlice";
import * as yup from 'yup';
import defaultImage from '../../assets/defaultImage.png';
import './addAndEditProduct.css';

const AddAndEditProduct = ()=>{
    const selectedProduct = useAppSelector(state => state.selectedProduct);
    const dispatch = useAppDispatch();

    console.log('selectedProduct: ', selectedProduct);
    
    const formik = useFormik({
        initialValues: {
            name: selectedProduct ? selectedProduct.name : '',
            description: selectedProduct ? selectedProduct.description : '',
            price: selectedProduct ? selectedProduct.price : 1,
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Name is required').max(30,'Name is too long'),
            description: yup.string().max(200,'Description is too long'),
            price: yup.number().required('Price is required').min(1, 'Price must be larger than 0'),
        }),
        enableReinitialize: true,
        onSubmit: values => {
            if (selectedProduct) {
                dispatch(updateProduct({ ...selectedProduct, ...values }));
            } else {
                dispatch(addProduct(values));
                dispatch(setSelectedProduct(values));
            }
        },
    });

    return (
        <fieldset className="addAndEditProductBody">
            <legend className="inBorder"> {selectedProduct?.name} Details </legend>
            <img className="productImg" src={defaultImage} alt="Product" />
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="name">Name *</label>
                <br />
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (<div className="error">{formik.errors.name}</div>)}
                <br />
                <label htmlFor="description">Description</label>
                <br />
                <textarea 
                    id="description"
                    name="description"
                    rows={2}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                {formik.errors.description && formik.touched.description && (<div className="error">{formik.errors.description}</div>)}
                <br />
                <label htmlFor="price">Price *</label>
                <br />
                <input
                    id="price"
                    name="price"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    className="priceInput"
                />
                <label>$</label>
                <br />
                {formik.errors.price && formik.touched.price && (<div className="error">{formik.errors.price}</div>)}
                <br />
                <button type="submit" className="saveBtn" disabled={!formik.isValid || !formik.dirty}>Save</button>
            </form>
        </fieldset>
    )
}

export default AddAndEditProduct;