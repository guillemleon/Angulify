export const GlobalFunctions = {
  getIdentity: () => {let identity = JSON.parse(localStorage.getItem('identity')); return identity},
  getToken: () => {let token = localStorage.getItem('token'); return token},
  getCurrentSong: () => {return localStorage.getItem('currentSong')}
}
