import http from "axios";

const getUserEmail = async () => {
  try {
    const response = await http.get("http://localhost:4000/api/private/profile", {
      headers: {
        authorization: sessionStorage.getItem("googleToken"),
      },
    });
    return response.data;
  } catch (err) {
    if (!err.response) return alert("network error");
    if (err.response.status === 401) return alert("Unauthorized");
    return alert("something went wrong");
  }
};

export default getUserEmail;
