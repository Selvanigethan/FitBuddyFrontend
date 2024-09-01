import React from 'react';

function Footer() {

    return (
        <footer className="content-footer footer bg-footer-theme">
        <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
          <div className="mb-2 mb-md-0">
          Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | <a href="http://localhost:3000">FitBuddy</a>
          </div>
        </div>
      </footer>
    );
    
}

export default Footer;