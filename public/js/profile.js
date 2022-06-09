const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#device-name').value.trim();
  const device_type = document.querySelector('#device-type').value.trim();
  const device_serial_number = document.querySelector('#device-serial-number').value.trim();
  //Todo: in front-end html, make is_availble a checkbox. Please check the is_available const
  const is_available = document.querySelector('#isAvailable').checked;

  if (name && device_type && device_serial_number && is_available ) {
    //Note: I've changed the original route from the miniproject, using api/devices for this route.
    const response = await fetch(`/api/devices`, {
      method: 'POST',
      body: JSON.stringify({ name, device_type, device_serial_number,is_available }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //Todo: once the front-end html is done, change the page to the proper one
      document.location.replace('/profile');
    } else {
      alert('Failed to create device');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/devices/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      //Todo: once the front-end html is done, change the page to the proper one
      document.location.replace('/profile');
    } else {
      alert('Failed to delete device');
    }
  }
};
//Todo: link new-device-form from frontend to this part:
document
  .querySelector('.new-device-form')
  .addEventListener('submit', newFormHandler);

//Todo: link device-list from frontend to this part:
document
  .querySelector('.device-list')
  .addEventListener('click', delButtonHandler);
