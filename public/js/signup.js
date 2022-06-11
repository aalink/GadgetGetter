const signUp = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const isSignedUp = true;
  
      const response = await fetch(`${document.location.pathname.trim()}`, {
        method: 'PUT',
        body: JSON.stringify({ email, password, isSignedUp }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.message);
      }  
  };

document
  .querySelector('.signup-form')
  .addEventListener('submit', signUp);