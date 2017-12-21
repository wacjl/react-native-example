import React,{Component} from 'react'
import PasswordGesture from 'react-native-gesture-password'


var Password1 = '';

export default class  extends Component{
	constructor(){
		super();
		this.state={
			 message: 'Please input your password.',
            status: 'normal'
		}
	}
    // Example for check password
    onEnd(password) {
        if (password == '123') {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });

            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }
    onReset() {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }
    // Example for set password
    /*
    onEnd: function(password) {
        if ( Password1 === '' ) {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: 'Please input your password secondly.'
            });
        } else {
            // The second password
            if ( password === Password1 ) {
                this.setState({
                    status: 'right',
                    message: 'Your password is set to ' + password
                });

                Password1 = '';
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message:  'Not the same, try again.'
                });
            }
        }
    }
    onStart: function() {
        if ( Password1 === '') {
            this.setState({
                message: 'Please input your password.'
            });
        } else {
            this.setState({
                message: 'Please input your password secondly.'
            });
        }
    }
    */

   
    render() {
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                />
        );
    }
}
