import React from 'react'
import {reduxForm} from 'redux-form'

const CreateTenantForm = React.createClass({
  render() {
    console.log('CreateTenantForm props - ', this.props)
    const {
      fields: {
        username,
        password,
        firstName,
        middleName,
        lastName,
        email,
        phone
      },
      handleSubmit,
      errors
    } = this.props

    return (
      <form className='ui small form' id="newUserForm" name="newUserForm" onSubmit={handleSubmit}>

        <label htmlFor="username"></label>
        <input id="username" type="text" placeholder="username" style={{display: 'none'}} />
        <label htmlFor="password"></label>
        <input id="password" type="password" placeholder="password" style={{display: 'none'}} />

        <div className='required inline field'>
          <label>Username</label>
          <input type="text" placeholder="Username" {...username} />
          {username.touched && username.error && <span style={{color: 'red'}}>{username.error}</span>}
        </div>
        <div className='required inline field'>
          <label>Password</label>
          <input type="password" placeholder="Password" {...password} />
          {password.touched && password.error && <span style={{color: 'red'}}>{password.error}</span>}
        </div>
        <div className='required inline field'>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName} />
          {firstName.touched && firstName.error && <span style={{color: 'red'}}>{firstName.error}</span>}
        </div>
        <div className='inline field'>
          <label>Middle Name</label>
          <input type="text" placeholder="Middle Name" {...middleName} />
          {middleName.touched && middleName.error && <span style={{color: 'red'}}>{middleName.error}</span>}
        </div>
        <div className='required inline field'>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName} />
          {lastName.touched && lastName.error && <span style={{color: 'red'}}>{lastName.error}</span>}
        </div>
        <div className='required inline field'>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email} />
          {email.touched && email.error && <span style={{color: 'red'}}>{email.error}</span>}
        </div>
        <div className='required inline field'>
          <label>Phone</label>
          <input type="tel" placeholder="Phone" {...phone} />
          {phone.touched && phone.error && <span style={{color: 'red'}}>{phone.error}</span>}
        </div>
        <button className='ui small button' type="submit" disabled={Object.keys(errors).length}>Create Tenant</button>
      </form>
    )
  }
})

const userSchema = {
  username: {
    rx: /^\w{3,30}$/,
    msg: 'username must be 3 - 30 letters, numbers, or underscore _'
  },
  password: {
    rx: /^\w{8,30}$/,
    msg: 'password much be 8 - 30 letters, numbers, or underscore _'
  },
  firstName: {
    rx: /^[A-Z]{2,40}$/,
    msg: 'First name must be 2 or more letters'
  },
  middleName: {
    rx: /^[A-Z]{0,40}$/,
    msg: 'Middle name is optional, must be letters'
  },
  lastName: {
    rx: /^[A-Z]{2,40}$/,
    msg: 'Last name must be 2 or more letters'
  },
  email: {
    rx: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|space|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
    msg: 'Must be a valid email address'
  },
  phone: {
    rx: /^([0-9]{3}-){2}[0-9]{4}$/,
    msg: 'Must be a 10 digit phone number'
  }
}

const asyncValidate = values => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(userSchema)
    const result = keys.reduce((errObj, key) => {
      if (!userSchema[key].rx.test(values[key])) {
        if (!values[key]) {
          //TODO fix this (submit empty form incorrectly shows this for middle name)
          errObj[key] = key + ' is required';
        } else {
          errObj[key] = userSchema[key].msg;
        }
      }
      return errObj
    }, {})
    if (Object.keys(result).length) {
      reject(result)
    } else {
      resolve()
    }
  })
}

export default reduxForm({
  form: 'createTenant',
  fields: [
    'username',
    'password',
    'firstName',
    'middleName',
    'lastName',
    'email',
    'phone'
  ],
  asyncValidate,
  asyncBlurFields: ['username', 'password', 'firstName', 'middleName', 'lastName', 'email', 'phone']
})(CreateTenantForm)
