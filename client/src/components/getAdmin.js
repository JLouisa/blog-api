import localHost from "./localHost";

const getIsAdmin = async () => {
  const token = localStorage.getItem("projectX");

  if (!token) {
    console.log("No token found");
    return false;
  }

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${localHost}/v1/api/user/admin`, requestOptions);
    const data = await response.json();

    console.log("Response status:", response.status);
    console.log("Response data:", data);
    console.log("data");
    console.log(data);

    if (response.ok) {
      return data.isAdmin;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error during fetch:", err);
    return false;
  }
};

export default getIsAdmin;
