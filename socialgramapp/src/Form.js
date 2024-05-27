export default function Form({
  username,
  password,
  onChangeUsername,
  onChangePassword,
  onFormSubmit,
}) {
  return (
    <form onSubmit={onFormSubmit}>
      <label>Username</label>
      <input
        minLength={5}
        maxLength={10}
        type="text"
        name="username"
        value={username}
        onChange={onChangeUsername}
      />
      <br />
      <br />
      <br />
      <label>Passowrd</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChangePassword}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
