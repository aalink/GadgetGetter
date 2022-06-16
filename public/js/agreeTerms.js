const agreeHandler = async (event) => { 
    const userId = event.target.getAttribute("data-userid");
    const response = await fetch (`/api/devices/${document.location.pathname.split('/')[2]}`, {
            method: 'PUT',
            body: JSON.stringify({user_id: userId, is_available: false}),
            headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok){
            document.location.replace('/finalpage');
    } else {
            alert(response.statusText);
    }
};
            
            
document.querySelector('.agreeButton').addEventListener('click',agreeHandler);