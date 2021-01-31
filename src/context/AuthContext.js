import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import swal from 'sweetalert';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@RPicker:token');
    const user = localStorage.getItem('@RPicker:user');

    if (token && user) {
      api.defaults.headers = `jwt ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const [photos, setPhotos] = React.useState([]);

  const signIn = useCallback(async ({ username, password }) => {
    setData({});
    try {
      const response = await api.post(
        '/login',
        {
          email: username,
          password,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        },
      );
      const { token, user } = response.data;

      localStorage.setItem('@RPicker:token', token);
      localStorage.setItem('@RPicker:user', JSON.stringify(user));

      api.defaults.headers = `jwt ${token}`;

      setData({ token, user });
    } catch (e) {
      if (e.message.includes('404')) {
        swal('User not found', ' ', 'error');
      } else {
        swal('Your password is wrong', '', 'error');
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@RPicker:token');
    localStorage.removeItem('@RPicker:user');

    setData({});
  }, []);

  const getData = useCallback(async () => {
    const response = await api.get('/image', {
      headers: {
        jwt: data.token,
      },
    });

    setPhotos(response.data);
  }, [data.token]);

  const addUser = useCallback(
    async ({ name, email, type, password }) => {
      console.log(name);
      const response = await api.post(
        '/users',
        {
          name,
          type,
          email,
          password,
        },
        {
          headers: {
            jwt: data.token,
          },
        },
      );
      console.log(response);
      if (response.data === 'User already exists') {
        swal('Oops', response.data, 'error');
      } else {
        swal('Good job!', 'User added succesfully', 'success');
      }
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, photos, signIn, signOut, getData, addUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
