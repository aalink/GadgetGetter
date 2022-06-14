const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.alert(`You're now logged out!`)
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.logout-button').addEventListener('click', logout);
