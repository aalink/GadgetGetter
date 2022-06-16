const deleteUser = async (event) => {
    const userId = event.target.getAttribute("data-user");
    const response = await fetch(`/api/users/${{userId}}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    if (response.ok){
        document.location.replace('/users/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-btn').addEventListener('click', deleteUser);