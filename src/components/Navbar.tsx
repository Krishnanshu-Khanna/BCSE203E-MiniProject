import React from "react";
import "./Navbar.css";

interface NavbarProps {
	setActiveComponent: React.Dispatch<React.SetStateAction<ActiveComponent>>;
}

enum ActiveComponent {
	QUIZ = "quiz",
	COIN_FLIP = "coin_flip",
	DRUMS = "drums",
	SIMON_GAME = "simon_game",
}

const Navbar: React.FC<NavbarProps> = ({setActiveComponent}) => {
	const handleNavItemClick = (component: ActiveComponent) => {
		setActiveComponent(component);
	};

	return (
		<div className='navbar'>
			<h2>
				<a href='https://www.linkedin.com/in/krishnanshu-khanna/' target="_blank">Krishnanshu</a>
			</h2>
			<ul>
				<li>
					<button onClick={() => handleNavItemClick(ActiveComponent.QUIZ)}>
						Math Quiz
					</button>
				</li>
				<li>
					<button onClick={() => handleNavItemClick(ActiveComponent.COIN_FLIP)}>
						Coin Flip
					</button>
				</li>
				<li>
					<button onClick={() => handleNavItemClick(ActiveComponent.DRUMS)}>
						Drums
					</button>
				</li>
				<li>
					<button onClick={() => handleNavItemClick(ActiveComponent.SIMON_GAME)}>
						Simon's Game
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
