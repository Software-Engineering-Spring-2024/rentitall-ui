import './../../styles/HomePage.css'

export const HomePage = (props) => {
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
                        <button>
                            Explore Rentals
                        </button>
                        <button className='secondary-button' onClick={props.handleProductListModal}>
                            List Your Items
                        </button>
                    </div>
                </div>
            </section>
            {/* <section>
                <div className="rent-by-category">
                    Categories
                </div>
            </section>
            <section>
                <div className='products-section'>
                    Products
                </div>
            </section> */}
        </div>
    )
}