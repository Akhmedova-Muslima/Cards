import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, selectProducts, setSort,} from "../stores/slices/productsSlice";
import Pagination from "../components/Pagination";

export default function Home() {
  const dispatch = useDispatch();

  const { items, currentPage, sortBy, limit, totalCount } = useSelector(selectProducts)

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, sort: sortBy }));}, 
    [dispatch, currentPage, sortBy]);

  const handleSortChange = (newSort) => {
    dispatch(setSort(newSort));
  };

  return (
    <div className="home">
      <h1 className="title">Main page</h1>

      <div className="controls">
        <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="title">По названию</option>
          <option value="price">По цене</option>
          <option value="stock">По количеству</option>
        </select>

        <Pagination
          currentPage={currentPage}
          limit={limit}
          totalCount={totalCount}
        />

      </div>

      <div className="products">
        {items.map((product) => (
          
          <div className="product" key={product.id}>
            
            <Link to={`/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Цена: ${product.price}</p>
              <p> Со скидкой: $ {( product.price - (product.price * product.discountPercentage) / 100 ).toFixed(2)}</p>
              <p>В наличии: {product.stock} шт.</p>
            </Link>

          </div>
        ))}
      </div>
    </div>
    
  );
}
