import React, { Component } from 'react';
import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
	render() {
		return (
			<header>
				<nav className={styles.navBar}>
					<ul>
						<li>
							<Link to="/home">Home</Link>
						</li>
						<li>
							<Link to="/strategies">Strategies</Link>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
