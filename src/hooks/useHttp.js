import { React, useCallback, useState } from "react";
function useHttp() {
  const [isLoading, setLoading] = useState(false);
  const [iserror, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, requestData) => {
    setLoading(true);
    setError(null);

    try {
      let resposeData = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      if (!resposeData.ok) {
        throw new Error("Request Failed!");
      }

      const response = await resposeData.json();

      requestData(response);
    } catch (error) {
      setError(error.message || "Something went Wrong");
      requestData(null);
      // requestData({});
    }
    setLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    iserror: iserror,
    sendRequest: sendRequest,
  };
}

export default useHttp;
