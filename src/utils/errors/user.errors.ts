// user errors

export const errorOnCreatingUser = (error: Error) => {
  alert(`Error creating the account - ${error.message}`);
};

export const errorOnSignIn = (error: Error) => {
  alert(`Error signing in - ${error}`)
};

export const errorOnEmailAlreadyInUse = () => {
  alert("Email already in use");
};

export const errorOnUserCreation = (error: Error) => {
  alert(`User creation encountered an error - ${error}`)
};