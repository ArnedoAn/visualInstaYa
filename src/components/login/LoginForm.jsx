function LoginForm(props) {
  const { handleSubmit, pristine, submitting, invalid } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        component={Input}
        type="email"
        label="Email"
        validate={[required, email]}
      />
      <Field
        name="password"
        component={Input}
        type="password"
        label="Password"
        validate={[required, minLength6]}
      />
      <Button type="submit" disabled={pristine || submitting || invalid}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
