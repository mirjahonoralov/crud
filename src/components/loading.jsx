import { useState } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  return [loading, startLoading, stopLoading];
};

export default Loading;
