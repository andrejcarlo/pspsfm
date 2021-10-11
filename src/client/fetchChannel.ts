const API_HOST = "http://45.63.41.251";

export const getNowPlaying = async () => {
    // GET request from API
    const url = `${API_HOST}/api/nowplaying`
    const response = await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
    const json = await response.json();
    return json;
  }