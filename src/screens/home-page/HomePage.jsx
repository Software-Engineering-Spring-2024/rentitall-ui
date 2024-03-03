export const HomePage = () => {
    return (
        <body>
            <title>Top Deal</title>
            
            <div id="frame">
                <input type="radio" name="frame" id="frame1" checked />
                <input type="radio" name="frame" id="frame2" />
                <input type="radio" name="frame" id="frame3" />
                <input type="radio" name="frame" id="frame4" />
                <div id="slides">
                    <div id="overflow">
                        <div class="inner">
                            <div class="frame frame_1">
                                <div class="frame-content">
                                    <img src="\rentitall-ui\src\assets\rentitall-logo.jpg" alt="Slide 1" />
                                </div>
                            </div>
                            <div class="frame frame_2">
                                <div class="frame-content">
                                    <img src="rentitall-logo.jpg" alt="Slide 2" />
                                </div>
                            </div>
                            <div class="frame frame_3">
                                <div class="frame-content">
                                    <img src="rentitall-logo.jpg" alt="Slide 3" />
                                </div>
                            </div>
                            <div class="frame frame_4">
                                <div class="frame-content">
                                    <img src="rentitall-logo.jpg" alt="Slide 4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="controls">
                    <label for="frame1"></label>
                    <label for="frame2"></label>
                    <label for="frame3"></label>
                    <label for="frame4"></label>
                </div>
                <div id="bullets">
                    <label for="frame1"></label>
                    <label for="frame2"></label>
                    <label for="frame3"></label>
                    <label for="frame4"></label>
                </div>
            </div>
            <section className="know-more">
    <div className="container">
        <h2>Know More About RentitAll - Your Rental Expert</h2>
        <div className="know-more-content">
            <p>RentitAll is your trusted partner for all your rental needs. With years of experience in the industry, we specialize in providing top-quality rental services for various products and equipment.</p>
            <p>Whether you're planning an event, working on a DIY project, or need equipment for your business, Rentit has you covered. Our extensive inventory includes everything from tools and machinery to party supplies and electronics.</p>
            <p>At Rentit, we pride ourselves on offering:</p>
            <ul>
                <li>Wide Selection: Choose from a diverse range of products to suit your needs.</li>
                <li>Quality Assurance: Our rental items undergo regular maintenance to ensure they're in excellent condition.</li>
                <li>Convenient Rental Process: Renting from us is easy and hassle-free, with flexible rental periods and convenient pickup/delivery options.</li>
                <li>Expert Support: Our team of knowledgeable staff is here to assist you every step of the way, from selecting the right equipment to providing technical support.</li>
            </ul>
            <p>Experience the convenience and reliability of Rentit for all your rental needs. Rent smarter with Rentit today!</p>
            <p>Ready to get started? Contact us now to discuss your rental needs and discover how Rentit can help you!</p>
        </div>
        <div className="interactive-buttons">
            <button className="contact-btn">Contact Us</button>
            <button className="learn-more-btn">Learn More</button>
        </div>
    </div>
</section>
            {/* Footer Section */}
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