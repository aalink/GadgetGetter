const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#device-name').value.trim();
  const device_serial_number = document.querySelector('#device-serial-number').value.trim();
  const device_type = document.querySelector('#device-type').value.trim();
  // TODO: Make is_available const
  // const is_available = 

  if (name && device_serial_number && device_type) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, device_serial_number, device_type }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
