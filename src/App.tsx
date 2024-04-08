// App.tsx

import React, {useState} from "react";
import {fetchQuizQuestions} from "./API";
import QuestionCard from "./components/QuestionCard";
import {QuestionsState, Difficulty} from "./API";
import "./App.css";
import Navbar from "./components/Navbar";
import CoinFlip from "./components/CoinFlip";

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

enum ActiveComponent {
	QUIZ = "quiz",
	COIN_FLIP = "coin_flip",
	DRUMS = "drums",
	SIMON_GAME = "simon_game",
}

const App: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionsState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
		ActiveComponent.QUIZ
	);

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);
		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty.MEDIUM
		);
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	const checkAnswer = (e: any) => {
		if (!gameOver) {
			const answer = e.currentTarget.value;
			const correct = questions[number].correct_answer === answer;
			if (correct) setScore((prev) => prev + 1);
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};

	const nextQuestion = () => {
		const nextQ = number + 1;
		if (nextQ === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQ);
		}
	};

	const renderActiveComponent = () => {
		switch (activeComponent) {
			case ActiveComponent.QUIZ:
				return (
					<>
						<h1>MATHS QUIZ</h1>
						{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
							<button className='start' onClick={startTrivia}>
								Start
							</button>
						) : null}
						{!gameOver ? <p className='score'>Score: {score}</p> : null}
						{loading ? <p>Loading Questions...</p> : null}
						{!loading && !gameOver && (
							<QuestionCard
								questionNr={number + 1}
								totalQuestions={TOTAL_QUESTIONS}
								question={questions[number].question}
								answers={questions[number].answers}
								userAnswer={userAnswers ? userAnswers[number] : undefined}
								callback={checkAnswer}
							/>
						)}
						{!gameOver &&
						!loading &&
						userAnswers.length === number + 1 &&
						number !== TOTAL_QUESTIONS - 1 ? (
							<button className='next' onClick={nextQuestion}>
								Next Question
							</button>
						) : null}
					</>
				);
			case ActiveComponent.COIN_FLIP:
				return <CoinFlip />;
			case ActiveComponent.DRUMS:
				return (
					<iframe
						src='https://krishnanshu-khanna.github.io/Drums/'
						frameBorder='0'></iframe>
				);
			case ActiveComponent.SIMON_GAME:
				return (
					<iframe
						src='https://krishnanshu-khanna.github.io/Old_Simon_Game/'
						frameBorder='0'></iframe>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div className='app-wrapper'>
				<Navbar setActiveComponent={setActiveComponent} />
				{renderActiveComponent()}
			</div>
		</>
	);
};

export default App;
