
export async function fetchWebApi(endpoint, method, body) {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return await res.json();
  }
  
export const getToken = async () => {
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const client_id = "23ec0362faf444b0a1ae4066bdaabed4";
    const client_secret = "350137b4e8274d36aa39e6a76de61329";
  
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", client_id);
    data.append("client_secret", client_secret);
  
    fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(`Error: ${data.error}`);
        } else {
          const access_token = data.access_token;
          localStorage.setItem("token", access_token);
          console.log("Access Token:", access_token);
        }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};