// user errors

export const errorOnCreatingUser = (error) => {
  alert(`Error creating the account - ${error.message}`);
};

export const errorOnSignIn = (error) => {
  alert(`Error signing in - ${error}`)
};

export const errorOnEmailAlreadyInUse = () => {
  alert("Email already in use");
};

export const errorOnUserCreation = (error) => {
  alert(`User creation encountered an error - ${error}`)
};