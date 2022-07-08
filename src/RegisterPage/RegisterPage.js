import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form,Icon, Header, Message, Segment } from 'semantic-ui-react'
import Logo from '../assets/logo.png'
import { userActions } from "../actions/userActions";
import Messages from "../components/Messages";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        retypepassword: ""
      },
      submitted: false,
      retTypePasswordError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    document.title = "Registro | TravelGo";
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  };

  handleRetypePassword = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    if (value !== this.state.user.password) {
      this.setState({
        user: {
          ...user,
          [name]: value
        },
        retTypePasswordError: true
      });
    } else {
      this.setState({
        user: {
          ...user,
          [name]: value
        },
        retTypePasswordError: false
      });
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    console.log(user)
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.email &&
      user.retypepassword &&
      !this.state.retTypePasswordError
    ) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering, alert } = this.props;
    const { user, submitted, retTypePasswordError } = this.state;
    return (
      <div className="form-centered">
        <img src={Logo} />
        <Header  style={{ color: '#fc8a10' }} as='h1' color='#fc8a10' textAlign='center'>
          Registrate 
        </Header>
        <div>
        Sin mayusculas,sin tildes ni caracteres especiales
          </div>
        <Form
          size="large"
          success={alert.type === "success" ? true : false}
          error={alert.type === "error" ? true : false}
          name="form"
          onSubmit={this.handleSubmit}
        >
        
        <Segment className="segment" size="large" name="form">
          <Form.Group widths="equal">
            <Form.Input
              required
              label="Nombre"
              placeholder="Nombres"
              type="text"
              name="firstName"
              value={user.firstName}
              error={submitted && !user.firstName ? true : false}
              onChange={this.handleChange}
            />

            <Form.Input
              required
              label="Apellidos"
              placeholder="Apellidos"
              type="text"
              name="lastName"
              value={user.lastName}
              error={submitted && !user.lastName ? true : false}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              required
              autoCapitalize="none"
              label="Usuario"
              placeholder="Ingresa tu usuario"
              type="text"
              name="username"
              value={user.username}
              error={submitted && !user.username ? true : false}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              value={user.email}
              error={submitted && !user.email ? true : false}
              onChange={this.handleChange}
            />
          </Form.Group>
        
          <Form.Input
            required
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            value={user.password}
            error={submitted && !user.password ? true : false}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Ingresa nuevamente tu contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="retypepassword"
            value={user.retypepassword}
            error={
              (submitted && !user.retypepassword ? true : false) ||
              retTypePasswordError
            }
            onChange={this.handleRetypePassword}
          />
          <Button
            size="large"
            content="Registrate"
            icon="signup"
            color="orange"
            fluid
            
            disabled={
              !retTypePasswordError &&
              user.retypepassword !== "" &&
              user.password !== "" &&
              user.email !== "" &&
              user.firstName !== "" &&
              user.lastName !== "" &&
              user.username !== ""
                ? false
                : true
            }
            loading={registering ? true : false}
          />
        
          {alert.type ? <Messages alert={alert} /> : null}
        </Segment>
        </Form>
        
        <Message size="large" attached="bottom">
          <Icon name="help" />
          Ya estas registrado?&nbsp;<Link to={"/login"}>Inicia sesión aqui</Link>
        </Message>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registering: state.registration.registering,
  alert: state.alert
});

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as default };
