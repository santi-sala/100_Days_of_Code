function postIsValid(title, content) {
  return title && content && title.trim() !== "" && content.trim() !== "";
}

function inputIsValid(enteredEmail, enteredPassword, enteredConfirmEmail) {
  return (
    enteredEmail &&
    enteredConfirmEmail &&
    enteredPassword &&
    enteredPassword.trim().length >= 6 &&
    enteredEmail === enteredConfirmEmail &&
    enteredEmail.includes("@")
  );
}

module.exports = {
  postIsValid: postIsValid,
  inputIsValid: inputIsValid,
};
