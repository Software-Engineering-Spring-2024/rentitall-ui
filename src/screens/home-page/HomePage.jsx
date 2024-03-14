import { useEffect, useState } from 'react'
import './../../styles/HomePage.css'
import axios from 'axios'
import { IoMdCar } from "react-icons/io";
import { LuLaptop2 } from "react-icons/lu";
import { GiClothes, GiSofa } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import img_placeholder from "./../../assets/Img-Placeholder.png"
import useMediaQuery from '../../hooks/useMediaQuery';

export const HomePage = (props) => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const isNotSmallScreen = useMediaQuery("(min-width: 768px")

    useEffect(() => {
        const getAvailableCategories = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_PRODUCT_SERVICE + "/categories");
                console.log("getAvailableCategories response", response?.data?.data)
                const availableCategories = response.data.data
                setCategories(availableCategories)

            } catch (error) {
                console.log(error)
            }
        }
        const getProductsList = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_PRODUCT_SERVICE + "/product-list");
                console.log("getProductsList response", response?.data?.data)
                const products_list = response.data.data
                const new_products_list = products_list.map(product => {
                    // if(product.image[0] == '/') {
                    //     const image = 'data:image/jpeg;base64,' + product.image
                    //     console.log(image)
                    //     product.image = image
                    // }
                    return product
                })
                setProducts(new_products_list)

            } catch (error) {
                console.log(error)
            }
        }
        getAvailableCategories();
        getProductsList();
    }, [])

    return (
        <div id="Homepage">
            <section>
                <div className='video-hero'>
                    <video src='https://goldnpawnshop.com/wp-content/uploads/2020/01/WebsiteVid2-YoutubeSetting.mp4' autoPlay loop muted />
                </div>
                <div className="wave-curve">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
                <div className="welcome-content">
                    <h1>Welcome to RentItAll</h1>
                    <h2>Your One-Stop Destination for Rental Marketplace</h2>
                    <p>At RentItAll, we're not just about renting items – we're about empowering you to rent out your own items too. Whether you're looking to rent something or want to earn some extra income by renting out your belongings, RentItAll is the platform for you.</p>
                    <br />
                    <p>Get Started Today!</p>
                    <br />
                    {/* <h2>Get Started Today!</h2>
                    <p>Whether you're looking to rent something or have items to rent out, RentItAll is your one-stop destination. Join our vibrant community and unlock the potential of collaborative consumption today.</p> */}
                    <div className='actions-wrapper'>
                        <button className='floating-animation'>
                            Explore Rentals
                        </button>
                        <button className='secondary-button floating-animation' onClick={props.handleProductListModal}>
                            List Your Items
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <div className="see-available-categories">
                    <h1 className='title'>See Available Categories</h1>
                    <ul className='categories-list'>
                        {categories.map(category =>
                            <li key={category.id}>
                                <div className='category-tile'>
                                    <a className='category-icon'>
                                        {category.name === 'Electronics' && <LuLaptop2 size='32' />}
                                        {category.name === 'Furniture' && <GiSofa size='32' />}
                                        {category.name === 'Vehicles' && <IoMdCar size='32' />}
                                        {category.name === 'Fashion' && <GiClothes size='32' />}
                                        {category.name === 'Others' && <BsThreeDots size='32' />}
                                    </a>
                                    {category.name}
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
            <section>
                <div className='products-section'>
                    <h1 className='title'>Rental Items</h1>
                    <div className='products-list'>
                        {
                            products.map(product =>
                                <div key={product.product_id} className="product-card">
                                    <div className='product-img-wrapper'>
                                        <img src={product.image} alt={product.title} onError={(e) => { e.target.onerror = null; e.target.src = img_placeholder; }} />
                                    </div>
                                    <div className='product-info'>
                                        <span className='product-category'>{categories.find(category => category.id === product.category_id).name || ''}</span>
                                        <p className='product-name'>{product.title}</p>
                                    </div>
                                    <div className='product-price'>${product.price_per_day}/day</div>
                                </div>
                            )
                        }
                    </div>
                    <div className='explore-more-rentals'>
                        <button>Explore more rental items</button>
                    </div>
                </div>
            </section>
            {isNotSmallScreen && <div className='spacer layered-wave'></div>}
        </div>
    )
}