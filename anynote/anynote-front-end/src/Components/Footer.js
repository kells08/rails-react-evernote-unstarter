import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div id="copyright">
			{/* <div className="container"> */}
				<div className="copyright">
					<h4>AnyNote 2018</h4>
					<h6>Developed by Kelly Lwakatare</h6>
					<p>Design: <a href="http://templated.co">TEMPLATED</a> Images: <a href="http://unsplash.com">Unsplash</a></p>
					<p>Connect with Kelly on Github or Twitter!</p>
					<ul className="icons">
						<li><a href="https://github.com/kells08" target="_blank" className="fa fa-github"><span>Github</span></a></li>
						<li><a href="https://twitter.com/kelly_lwakatare" target="_blank" className="fa fa-twitter"><span>Twitter</span></a></li>
					</ul>
				</div>
			</div>
		// </div>
    );
  }
}

export default Footer;