export function fetchHouseholds() {
  return {
    type: "FETCH_HOUSEHOLDS",
    payload: {
      fetch(GET_HOUSEHOLDS, {mode: 'cors', credentials: 'include'}).then(res => res.json())
    }
  }
}
