const url = 'http://localhost:3000/notes';

export const getNotes = () => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  });
};

export const saveNote = note => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  };

  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  });
};

export const deleteNote = id => {
  const options = {
    method: 'DELETE',
  };

  return fetch(`${url}/${id}`, options).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  });
};

export const updateNote = (id, updateNote) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateNote),
  };

  return fetch(`${url}/${id}`, options).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  });
};