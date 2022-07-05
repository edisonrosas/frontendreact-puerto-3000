import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form,Icon, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { userActions } from "../actions/userActions";
import Messages from "../components/Messages";
import Logo from '../assets/logo.png'
import portada from '../assets/portada.png'
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: "",
      password: "",
      emailToVerify: "",
      forgotPasswordEmail: "",
      submitted: false,
      showForm: false,
      forgotPasswordForm: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    document.title = "Iniciar Sesión | TravelGo";
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
    //this.setState({ email: "", password: "", submitted: false });
  }

  resendEmailVerification = () => {
    this.props.dispatch(
      userActions.sendVerificationEmail(this.state.emailToVerify)
    );
  };

  forgotPasswordEmail = () => {
    this.props.dispatch(
      userActions.sendforgotPasswordEmail(this.state.forgotPasswordEmail)
    );
  };

  toggleEmailVerification = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  toggleForgotPasswordForm = () => {
    this.setState({
      forgotPasswordForm: !this.state.forgotPasswordForm,
    });
  };

  render() {
    const { loggingIn, alert } = this.props;
    const {
      email,
      password,
      submitted,
      showForm,
      forgotPasswordForm,
    } = this.state;
    return (
      <div class="ui two column grid">
      <div class = "column">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <img src={Logo} />

        <Header  style={{ color: '#fc8a10' }} as='h1' color='#fc8a10' textAlign='center'>
          Ingresa a tu cuenta
        </Header>
        <Form
          size="large"
          name="form"
          success={alert.type === "success" ? true : false}
          error={alert.type === "error" ? true : false}
          onSubmit={this.handleSubmit}>
            <Segment className="segment" size="large" name="form">
                <Form.Input
                      fluid
                      icon= 'user'
                      iconPosition= 'left'
                      autoCapitalize="none"
                      placeholder="Ingresa tu email o usuario"
                      type="text"
                      name="email"
                      value={email}
                      error={submitted && !email ? true : false}
                      onChange={this.handleChange}
                />

                <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Ingresa tu contraseña'
                      type="password"
                      name="password"
                      value={password}
                      error={submitted && !password ? true : false}
                      onChange={this.handleChange}
                    />
               <Button
                    size="large"
                    fluid
                    content="Ingresar"
                    color="orange"
                    disabled={email !== "" && password !== "" ? false : true}
                    loading={loggingIn ? true : false}
                  />

                  {alert.type ? 
                <Messages alert={alert} /> : null}
            </Segment>
          
        </Form>
        <Message size="large" attached="bottom" >
          <Icon name="help" />
          No tienes una cuenta?&nbsp;
          <Link to={"/register"}>Registrate</Link>
          <br></br>
          <Icon name="help" />
          Olvidaste tu contraseña?&nbsp;
          <span
            onClick={this.toggleForgotPasswordForm}
            style={{
              textDecoration: "underline",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Reestablecer tu contraseña
          </span>
          <br></br>
          <Icon name="envelope" />
          Reenviar correo electrónico de verificación.&nbsp;
          <span
            onClick={this.toggleEmailVerification}
            style={{
              textDecoration: "underline",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Reenviar
          </span>
        </Message>
        {showForm ? (
          <Form className="segment" size="large" name="form">
            <Form.Field>
              <label>Email</label>
              <input
                name="emailToVerify"
                placeholder="Email"
                type="email"
                onChange={this.handleChange}
              />
            </Form.Field>

            <Button fluid type="submit" color="orange"
              onClick={this.resendEmailVerification}>
              Enviar
            </Button>
          </Form>
        ) : null}

        {forgotPasswordForm ? (
          <Form className="segment" size="large" name="form">
            <Form.Field>
              <label>Email</label>
              <input
                name="forgotPasswordEmail"
                placeholder="Email"
                type="email"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button fluid type="submit" color="orange"
                onClick={this.forgotPasswordEmail}>
              Enviar
            </Button>
          </Form>
        ) : null}
      </Grid.Column>
      </Grid>
      </div>

      <div class = "column">
      <Grid.Column style={{ maxWidth: 1000 , maxHeight: 1000}}>
            <img src={portada} />
      </Grid.Column>
      </div>
    </div> 
    );
  }
}

const mapStateToProps = (state) => ({
  loggingIn: state.authentication.loggingIn,
  alert: state.alert,
});

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as default };
