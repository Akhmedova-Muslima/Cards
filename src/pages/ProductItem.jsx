import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../stores/slices/productsSlice'
import 'swiper/css'

export default function ProductItem() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { items: products, error } = useSelector(state => state.products)

  const item = products.find(product => product.id === Number(id))

  useEffect(() => {
    if (!item) {
      dispatch(fetchProducts({ page: 0 }))
    }
  }, [dispatch, item])

  if (!item) {
    if (error) 
    return <div className="error">Ошибка: {error}</div>
    return <div className="loading">Загрузка товара...</div>
  }

  const discountedPrice = (
    item.price - (item.price * item.discountPercentage) / 100
  ).toFixed(2)

  return (
    <div className="product_item">
      <div className="product_item_content">
        <div className="product_item_gallery">
          
          <Swiper 
          spaceBetween={10} 
          slidesPerView={1}>
            {item.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={item.title} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        <div className="product_item_info">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Discounted price: ${discountedPrice}</p>
          <p>Stock: {item.stock}</p>
        </div>
      </div>

      <Link to="/" className="product_item_back">
        ← Back to Home
      </Link>
    </div>
  )
}
