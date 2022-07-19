import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) =>{

  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@') }
  }

  return {value:'', isValid: false}
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const ctx = useContext(AuthContext)
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, DispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, DispatchPassword] = useReducer (passwordReducer, {value: '', isValid: null})

  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log('Entered function')
    const timer = setTimeout(() => {
      console.log('Checking form validity!')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500)
    console.log('End of function')
    return () => {
      console.log('Clean UP!')
      clearTimeout(timer)}
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    DispatchEmail({ type:'USER_INPUT', val: event.target.value });
    
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // )
  };

  const passwordChangeHandler = (event) => {
    DispatchPassword({ type:'USER_INPUT', val:event.target.value })

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // )
  };

  const validateEmailHandler = () => {
    DispatchEmail({type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    DispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          isValid={emailIsValid} 
          label={"E-Mail"} 
          type="email" 
          id="email" 
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          ref={passwordInputRef}
          isValid={passwordIsValid} 
          label={"Password"} 
          type="password" 
          id="password" 
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
