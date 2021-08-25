import React from 'react';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {

    const successCounts = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success'){
            total++;
        }
        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((item, index) => {

                    return (
                        <li 
                            key={index}
                            
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {item.question}
                            {props.results[item.id] === 'success' ? 
                                <i className={'fa fa-check ' + classes.success}/> : 
                                <i className={'fa fa-times ' + classes.error}/>
                            }
                        </li> 
                    )
                    
                })}
            </ul>

            <p>Правильно: {successCounts} из {props.quiz.length}</p>

            <div>
                <button onClick={props.onRetry}>
                    Пройти заново
                </button>
            </div>
        </div>
    )
}

export default FinishedQuiz