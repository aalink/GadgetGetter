const agreeHandler = async (event) => {
    const userId = event.target.getAttribute("data-userid");
    console.log(userId);
    const response = await fetch ('/api/devices/:id', {
            method: 'PUT',
            body: JSON.stringify({userId}),
            headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok){
            document.location.replace('/profile');
    } else {
            alert(response.statusText);
    }
};
            
            
document.querySelector('.agreeButton').addEventListener('click',agreeHandler);