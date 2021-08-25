import React from 'react';
import AnswersItem from './AnswersItem';
import classes from './AnswersList.module.css';

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, index) => 
            <AnswersItem 
                key={index}
                answer={answer}
                onAnswerClick={props.onAnswerClick}
                state={props.state ? props.state[answer.id] : null}
            />
        )}
    </ul>
)

export default AnswersList;