import {useState} from "react";
import "./CoinFlip.css"; 

const CoinFlip = () => {
	const [headsCount, setHeadsCount] = useState(0);
	const [tailsCount, setTailsCount] = useState(0);
	const [isDisabled, setIsDisabled] = useState(false);
	const handleFlip = () => {
		setIsDisabled(true);

		const i = Math.floor(Math.random() * 2);
		const coin = document.querySelector(".coin") as HTMLElement;

		coin.style.animation = "none"; 

		setTimeout(() => {
			if (i) {
				coin.style.animation = "spin-heads 3s forwards";
				setHeadsCount((prevCount) => prevCount + 1);
			} else {
				coin.style.animation = "spin-tails 3s forwards";
				setTailsCount((prevCount) => prevCount + 1);
			}
		}, 100);

		setTimeout(() => {
			setIsDisabled(false);
		}, 3000);
	};

	const handleReset = () => {
		const coin = document.querySelector(".coin") as HTMLElement;
		coin.style.animation = "none";
		setHeadsCount(0);
		setTailsCount(0);
	};

	return (
		<div className='container'>
			<div className='coin' id='coin'>
				<div className='heads'>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Indian_20_Rupee_coin_Reverse.png/220px-Indian_20_Rupee_coin_Reverse.png'
						alt='Heads'
					/>
				</div>
				<div className='tails'>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/0/0f/Indian_20_Rupee_coin.png'
						alt='Tails'
					/>
				</div>
			</div>
			<div className='stats'>
				<p id='heads-count'>Heads: {headsCount}</p>
				<p id='tails-count'>Tails: {tailsCount}</p>
			</div>
			<div className='buttons'>
				<button id='flip-button' onClick={handleFlip} disabled={isDisabled}>
					Flip Coin
				</button>
				<button id='reset-button' onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default CoinFlip;
