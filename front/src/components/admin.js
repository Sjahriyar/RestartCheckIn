import React from 'react';


export default class Admin extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      Data:{
        email: '',
        password: ''
      },
      message: {
        email: '',
        password: ''
      }
    }

    this.hdlChange     = this.hdlChange.bind(this);
    this.hdlSubmitUser = this.hdlSubmitUser.bind(this);

  }

  hdlSubmitUser(event){
      event.preventDefault();
      this.setState({
        success: ''
      });
            window.location.href = '/add'



  }


  hdlChange(element){
      var temp = this.state.Data;
      temp[element.target.name] = element.target.value;

      this.setState({
          Data: temp

      });
  }

  render(){
    return (
      <div>
        <div className="container">
        	<div className="page-lock">

            	<div className="page-body">
            		<div className="lock-head">
            			 Admin LogIn
            		</div>
            		<div className="lock-body">
            			<div className="pull-left lock-avatar-block">
            				<img src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/photo3.jpg" className="lock-avatar" />
            			</div>
            			<form className="lock-form pull-left" action="" method="POST" onSubmit={this.hdlSubmitUser}>

                    <div className="form-group">
                    <input onChange={this.hdlChange} type="text" name="email" ref="email" placeholder="Email" className="form-control placeholder-no-fix" />
                    <span className="text-danger">{this.state.message.email}</span>
            				</div>

                    <div className="form-group">
                    <input onChange={this.hdlChange} type="password" name="password" ref="password" placeholder="Password" className="form-control placeholder-no-fix" />
                    <span className="text-danger">{this.state.message.password}</span>
            				</div>

            				<div className="form-actions">
            					<button type="submit" className="btn btn-success uppercase">Login</button>
            				</div>

            			</form>
            		</div>
            	</div>
            </div>
        </div>

      </div>
    );
  }
}
