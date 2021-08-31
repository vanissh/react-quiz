import React from 'react'
import classes from './QuizCreator.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {createControl} from '../../form/formFramework'

function createOptionControl(num){
    return createControl({
        label: `Вариант ${num}`,
        errorMessage: 'Значение не может быть пустым',
        id: num
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}
class QuizCreator extends React.Component {

    state = {
        quiz: [],
        formControls: createFormControls(),
    }

    onSubmitHandler(e){
        e.preventDefault()
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    onChangeHandler = (value, name) => {
        
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((name, index)=> {
            const control = this.state.formControls[name]
            return (
                <>
                <Input 
                    key={name + index}
                    type={control.type}
                    label={control.label}
                    valid={control.valid}
                    value={control.value}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    onChange={event => this.onChangeHandler(event.target.value, name)}
                />
                { index === 0 ? <hr/> : null}
                </>
            )
        })
    }

    render(){
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={(e) => this.onSubmitHandler(e)}>

                       { this.renderInputs() }

                        <select></select>

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator