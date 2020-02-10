const axios = require('axios')


const fetcher = axios.create({
   baseURL: `/`,
   withCredentials: true
});

const getQuery = (query) => {
   let result = '';
   for (const q in query) {
      result += `${q}=${query[q]}&`
   }
   return result
}

async function getDataFromServer(type, handleSuccess, query) {
   try {
      const response = await fetcher.get(`/apartments?${getQuery(query)}`)
      const apartments = response.data;
      return handleSuccess(apartments)
   } catch (error) {
      throw new Error(`get apartment failed with error: ${error}`)
   }
}


async function addApartments(data) {
   try {
      await fetcher.post(`/apartments`, data)
      return
   } catch (error) {
      throw new Error(`get apartment failed with error: ${error}`)
   }
}
async function getCurrentApartment(byId) {
   try {
      const currentApartment = await fetcher.get(`/apartments/${byId}`);
      return currentApartment.data
   } catch (error) {
      return error
   }
}
async function getUserApartments(byId) {
   try {
      const apartments = await fetcher.get(`/apartments?user_id=${byId}`);
      return apartments
   } catch (error) {
      return error
   }
}

async function loginUser(data) {
   try {
      const login = await fetcher.post('/login', data);
      return login
   } catch (error) {
      return error
   }
}

async function signUpUser(data) {
   try {
      const signUp = await fetcher.post(`/users`, data);
      return signUp
   } catch (error) {
      return error
   }
}

async function getCities() {
   try {
      const sucsess = await fetcher.get(`/cities`);
      return sucsess.data.cities
   } catch (error) {
      return error
   }
}

async function deleteApartment(byId) {
   try {
      const sucsess = await fetcher.delete(`/apartments?id=${byId}`);
      return sucsess.data.cities
   } catch (error) {
      return error
   }
}

async function editApartments(data) {
   try {
      await fetcher.put(`/apartments`, data)
      return;
   } catch (error) {
      throw new Error(`edit apartment failed with error: ${error}`)
   }
}

async function getCountries() {
   try {
      const sucsess = await fetcher.get(`/countries`);
      return sucsess.data.countries;
   } catch (error) {
      return error
   }
}

async function getAllUsers() {
   try {
      const sucsess = await fetcher.get(`/users`);
      return sucsess.data.users
   } catch (error) {
      return error
   }
}

export {
   getDataFromServer,
   loginUser,
   signUpUser,
   getCurrentApartment,
   getUserApartments,
   addApartments,
   getCities,
   getCountries,
   deleteApartment,
   editApartments,
   getAllUsers
};