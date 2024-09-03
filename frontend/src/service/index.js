import Axios from 'axios';

const axiosRequest = (method, url , data = null) => {
  switch (method) {
    case 'get':
      return Axios.get(url);
    case 'post':
      return Axios.post(url , data);
     case 'patch' :
      return Axios.patch(url , data);
    case 'delete':
      return Axios.delete(url , data);

  }
};


export { axiosRequest };
