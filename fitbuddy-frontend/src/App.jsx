import React from 'react';
import './assets/styles/App.css';
import { Link } from 'react-router-dom';
import logo from '../src/assets/images/fitbuddy.png';

function App() {
  return (     
    <div className="site-wrap">

    <div className="site-mobile-menu">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div className="site-mobile-menu-body"></div>
    </div>

        <header className="site-navbar" role="banner">

          <div className="container">
            <div className="row align-items-center">
              
              <div className="col-11 col-xl-4">
              <div className="logo">
                <div className="logo_img">
                  <img src={logo} alt=""/>
                </div>
              </div>

                <h1 className="mb-0 site-logo"><a href="index.html" className="text-white mb-0">FitBuddy<span className="text-primary">.</span> </a></h1>
              </div>
              <div className="col-12 col-md-8 d-none d-xl-block">
                <nav className="site-navigation position-relative text-right" role="navigation">
    
                  <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li className="active"><a href=""><span>Home</span></a></li>
                    {/* <li className="has-children">
                      <a href="services.html"><span>Services</span></a>
                      <ul className="dropdown arrow-top">
                        <li><a href="#">Physical Therapy</a></li>
                        <li><a href="#">Massage Therapy</a></li>
                        <li><a href="#">Chiropractic Therapy</a></li>
                        <li className="has-children">
                          <a href="#">Dropdown</a>
                          <ul className="dropdown">
                            <li><a href="#">Physical Therapy</a></li>
                            <li><a href="#">Massage Therapy</a></li>
                            <li><a href="#">Chiropractic Therapy</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li> */}
                    {/* <li><a href=""><span>About</span></a></li> */}
                    {/* <li><a href="blog.html"><span>Blog</span></a></li> */}
                    <li><a href=""><span>Contact</span></a></li>

                    <li className='register_btn'><Link to="/register"><span>Become a Member</span></Link></li>&nbsp;&nbsp;&nbsp;
                    <li className='login_btn'><Link to="/login"><span>Login</span></Link></li>
                      
                  </ul>
                </nav>
              </div>
    
    
              <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{position: 'relative', top: 3+'px'}}><a href="#" className="site-menu-toggle js-menu-toggle text-white"><span className="icon-menu h3"></span></a></div>
            
            </div>
          </div>
          
        </header>

        <div className="site-blocks-cover overlay" style={{ backgroundImage: `url(images/hero_bg_1.jpg)` }} data-aos="fade" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">

          <div className="col-md-10">
            
            <div className="row justify-content-center mb-4">
              <div className="col-md-10 text-center">
                <h1 data-aos="fade-up" className="mb-5">We give solutions to your <span className="typed-words"></span></h1>

                <p data-aos="fade-up" data-aos-delay="100"><a href="#" className="btn btn-primary btn-pill">Get Started</a></p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>  

    <div className="block-quick-info-2">
      <div className="container">
        <div className="block-quick-info-2-inner">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon icon-home mr-3"></span>
                <div className="text">
                  <strong className="d-block heading">Visit our Location</strong>
                  <span className="excerpt">2875  Beechwood Drive</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon icon-phone mr-3"></span>
                <div className="text">
                  <strong className="d-block heading">Call us today</strong>
                  <span className="excerpt"><a href="#">+(123) 456 7890</a></span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon icon-envelope mr-3"></span>
                <div className="text">
                  <strong className="d-block heading">Send us a message</strong>
                  <span className="excerpt"><a href="#">info@mysite.com</a></span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon icon-clock-o mr-3"></span>
                <div className="text">
                  <strong className="d-block heading">Opening hours</strong>
                  <span className="excerpt">Mon-Fri 7:AM - 5PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="block-services-1 py-5">
      <div className="container">
        <div className="row">
          <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
            <h3 className="mb-3">What We Offer</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia rerum, aliquid velit minima inventore ad consequatur accusamus dolor.</p>
            <p><a href="#" className="d-inline-flex align-items-center block-service-1-more"><span>See all services</span> <span className="icon-keyboard_arrow_right icon"></span></a></p>
          </div>
          <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
            <div className="block-service-1-card">
              <a href="#" className="thumbnail-link d-block mb-4"><img src="images/img_1.jpg" alt="Image" className="img-fluid"/></a>
              <h3 className="block-service-1-heading mb-3"><a href="#">Physical Therapy</a></h3>
              <div className="block-service-1-excerpt"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim odit molestias inventore, id sed, in harum tenetur earum.</p></div>
              <p><a href="#" className="d-inline-flex align-items-center block-service-1-more"><span>Find out more</span> <span className="icon-keyboard_arrow_right icon"></span></a></p>
            </div>
          </div>
          <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
            <div className="block-service-1-card">
              <a href="#" className="thumbnail-link d-block mb-4"><img src="images/img_2.jpg" alt="Image" className="img-fluid"/></a>
              <h3 className="block-service-1-heading mb-3"><a href="#">Chiropractic Therapy</a></h3>
              <div className="block-service-1-excerpt"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim odit molestias inventore, id sed, in harum tenetur earum.</p></div>
              <p><a href="#" className="d-inline-flex align-items-center block-service-1-more"><span>Find out more</span> <span className="icon-keyboard_arrow_right icon"></span></a></p>
            </div>
          </div>
          <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
            <div className="block-service-1-card">
              <a href="#" className="thumbnail-link d-block mb-4"><img src="images/img_3.jpg" alt="Image" className="img-fluid"/></a>
              <h3 className="block-service-1-heading mb-3"><a href="#">Massage Therapy</a></h3>
              <div className="block-service-1-excerpt"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim odit molestias inventore, id sed, in harum tenetur earum.</p></div>
              <p><a href="#" className="d-inline-flex align-items-center block-service-1-more"><span>Find out more</span> <span className="icon-keyboard_arrow_right icon"></span></a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="block-half-content-1 d-block d-lg-flex mt-5">
      <div className="block-half-content-img" style={{ backgroundImage: `url(images/hero_bg_1.jpg)` }}>
        
      </div>
      <div className="block-half-content-text bg-primary">
        <div className="block-half-content-text-inner">
          <h2 className="block-half-content-heading mb-4">Why Choose Us</h2>
          <div className="block-half-content-excerpt">
          <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut tenetur possimus nam totam, repellat expedita ullam amet velit.</p>
          </div>
        </div>

        <div className="block-counter-1 section-counter">
          <div className="row">
            <div className="col-sm-4">
              <div className="counter">
                <div className="number-wrap">
                  <span className="block-counter-1-number" data-number="3">0</span><span className="append">K</span>
                </div>
                <span className="block-counter-1-caption">Happy Customers</span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="counter">
                <div className="number-wrap">
                  <span className="block-counter-1-number" data-number="7">0</span><span className="append"></span>
                </div>
                <span className="block-counter-1-caption">Years of Experience</span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="counter">
                <div className="number-wrap">
                  <span className="block-counter-1-number" data-number="100">0</span><span className="append">%</span>
                </div>
                <span className="block-counter-1-caption">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="site-section bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12 text-center">
            <h2 className="site-section-heading text-center font-secondary">Our Special Offers</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-block d-lg-flex">
          <div className="half-wrap d-block d-md-flex">
            <div className="half bg-white d-block d-md-flex arrow-right">
              <div className="text">
                <h2>Physical Therapy</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, unde!</p>
                <p><a href="course-details.html" className="btn btn-primary btn-sm btn-pill">Learn More</a></p>
              </div>
            </div>
            <div className="half bg-img img" style={{ backgroundImage: `url(images/img_1.jpg)` }}></div>
          </div>
          <div className="half-wrap d-block d-md-flex">
            <div className="half bg-white d-block d-md-flex arrow-right">
              <div className="text">
                <h2>Massage Therapy</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, unde!</p>
                <p><a href="course-details.html" className="btn btn-primary btn-sm btn-pill">Learn More</a></p>
              </div>
            </div>
            <div className="half bg-img img" style={{ backgroundImage: `url(images/img_2.jpg)` }}></div>
          </div>
        </div>

        <div className="d-block d-lg-flex">
            <div className="half-wrap d-block d-md-flex">
              <div className="half bg-white d-block d-md-flex arrow-left order-md-2">
                <div className="text">
                  <h2>Chiropractic Therapy</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, unde!</p>
                  <p><a href="course-details.html" className="btn btn-primary btn-sm btn-pill">Learn More</a></p>
                </div>
              </div>
              <div className="half bg-img img" style={{ backgroundImage: `url(images/img_3.jpg)` }}></div>
            </div>
            <div className="half-wrap d-block d-md-flex">
              <div className="half bg-white  d-block d-md-flex arrow-left order-md-2">
                <div className="text">
                  <h2>Chiropractic Therapy</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, unde!</p>
                  <p><a href="course-details.html" className="btn btn-primary btn-sm btn-pill">Learn More</a></p>
                </div>
              </div>
              <div className="half bg-img img" style={{ backgroundImage: `url(images/img_4.jpg)` }}></div>
            </div>
          </div>
      </div>
    </div>

    <div className="mt-5 block-cta-1" style={{ backgroundImage: `url(images/hero_bg_2.jpg)`}}>
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h2 className="mb-3 mt-0 text-white">Upto 30% Discount for The First Commers</h2>
            <p className="mb-0 text-white lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
          <div className="col-lg-4">
            <p className="mb-0"><a href="contact.html" className="btn btn-outline-white text-white btn-md btn-pill px-5 font-weight-bold btn-block">Contact Us</a></p>
          </div>
        </div>
      </div>
    </div>
    
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">Quick Links</h2>
                <ul className="list-unstyled">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Testimonials</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">Products</h2>
                <ul className="list-unstyled">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Testimonials</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">Features</h2>
                <ul className="list-unstyled">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Testimonials</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                <h2 className="footer-heading mb-4">Follow Us</h2>
                <a href="#" className="pl-0 pr-3"><span className="icon-facebook"></span></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-twitter"></span></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-instagram"></span></a>
                <a href="#" className="pl-3 pr-3"><span className="icon-linkedin"></span></a>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <h2 className="footer-heading mb-4">Subscribe Newsletter</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <form action="#" method="post" className="subscription">
              <div className="input-group mb-3  d-flex align-items-stretch">
                <input type="text" className="form-control bg-transparent" placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2"/>
                <button className="btn btn-primary text-white" type="button" id="button-addon2">Send</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row pt-5 mt-5">
          <div className="col-12 text-md-center text-left">
            <p>
            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | <a href="http://localhost:3000">FitBuddy</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}

export default App;