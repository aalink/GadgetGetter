// const signUp = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#name-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
//     // const isSignedUp = true;
//     // console.log(`/api/users/signup`);
//       const response = await fetch(`/api/users/signup`, {
//         method: 'POST',
//         body: JSON.stringify({ name, email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert(response.message);
//       }  
//   };

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signUp);