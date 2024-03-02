
export const HomePage = () => {
    return (
        <body>
            <div className="container">
                <div className="left-section">
                    <h2>Deals</h2>
                    <ul>
                        <li className="deal-item">
                            <span className="deal-name">Deal 1</span>
                            <span className="deal-price">$100</span>
                        </li>
                        <li className="deal-item">
                            <span className="deal-name">Deal 2</span>
                            <span className="deal-price">$150</span>
                        </li>
                        <li className="deal-item">
                            <span className="deal-name">Deal 3</span>
                            <span className="deal-price">$200</span>
                        </li>
                    </ul>
                </div>
                <div className="right-section">
                    <h2>Top Deal</h2>
                    <div className="top-deal">
                        <h3>Top Deal</h3>
                        <p>This is the top deal</p>
                        <p className="deal-price">$250</p>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-info">
                            <h3>Contact Us</h3>
                            <p>Email: info@rentalcompany.com</p>
                            <p>Phone: 123-456-7890</p>
                        </div>
                    
                        <div className="social-media">
                            <h3>Follow Us</h3>
                            <ul>
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>

                </div>
                
            </footer>
        </body>
    );
}