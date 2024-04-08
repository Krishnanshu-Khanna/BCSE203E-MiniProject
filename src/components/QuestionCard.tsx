import React from "react";
import {AnswerObject} from "../App";
import "./QuestionCard.css";

type Props = {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	questionNr: number;
	totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNr,
	totalQuestions,
}) => (
	<div className='wrapper'>
		<p className='number'>
			Question: {questionNr} / {totalQuestions}
		</p>
		<p dangerouslySetInnerHTML={{__html: question}} />
		<div>
			{answers.map((answer) => (
				<div
					key={answer}
					className={`buttonWrapper ${
						userAnswer?.correctAnswer === answer
							? "correct"
							: userAnswer?.answer === answer
							? "userClicked"
							: ""
					}`}>
					<button
						disabled={userAnswer ? true : false}
						value={answer}
						onClick={callback}>
						<span dangerouslySetInnerHTML={{__html: answer}} />
					</button>
				</div>
			))}
		</div>
	</div>
);

export default QuestionCard;
