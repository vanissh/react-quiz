import React from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import { connect } from 'react-redux'
import auth from '../../store/actions/auth'

class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                errorMessage: 'Введите корректный email',
                label: 'Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                errorMessage: 'Введите корректный пароль',
                label: 'Пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    label={control.label}
                    valid={control.valid}
                    value={control.value}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    loginHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = e => {
        e.preventDefault()
    }

    validateControl (value, validation){
        if(!validation){
            return true
        }

        let isValid = true

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email){
            isValid = is.email(value) && isValid
        }

        if(validation.minLength){
            isValid = value.trim().length >= 6 && isValid
        }

        return isValid
    }
    onChangeHandler = (e, name) => {

        const formControls = { ...this.state.formControls }
        const control = { ...formControls[name]}

        control.value = e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        let isFormValid = true

        formControls[name] = control

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, isFormValid
        })
    }

    render(){
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        
                        { this.renderInputs() }
                        
                        <Button
                            type="success"
                            onClick={() => this.loginHandler()}
                            disabled={!this.state.isFormValid}
                        >   
                            Вход
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => this.registerHandler()}
                            disabled={!this.state.isFormValid}
                        >   
                            Регистрация
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}
export default connect(null, mapDispatchToProps)(Auth)

