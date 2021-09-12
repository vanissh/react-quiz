import React, {Fragment} from 'react'
import classes from './QuizCreator.module.css'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import Button from '../../components/UI/Button/Button'
import {createControl, validate , validateForm} from '../../form/formFramework'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'


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
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    onSubmitHandler(e){
        e.preventDefault()
    }

    addQuestionHandler = (e) => {
        e.preventDefault()

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }
        
        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }

    createQuizHandler = async e => {
        e.preventDefault()
  
        this.setState({
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
        })

        this.props.finishCreateQuiz()
    }

    onChangeHandler = (value, name) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[name]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[name] = control

        this.setState({
            formControls, 
            isFormValid: validateForm(formControls)
        })
    }

    selectChangeHandler = e => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((name, index)=> {
            const control = this.state.formControls[name]
            return (
                <Fragment key={name + index}>
                <Input 
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
                </Fragment>
            )
        })
    }

    render(){

        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={(e) => this.onSubmitHandler(e)}>

                       { this.renderInputs() }

                       { select }

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(QuizCreator)