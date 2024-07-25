import axios from "axios";
import { useState } from "react";
import { baseURL } from "../redux/config";
import { useNavigate } from "react-router-dom";

const useAxios = ({
  path,
  body = {},
  config,
}: {
  path: string;
  body?: any;
  config?: any;
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const fetchFn = () => {
    setLoading(true);
    axios
      .get(`${baseURL}${path}`)
      .then((response) => {
        setLoading(false);
        setError(null);
        setData(response?.data);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          navigate("/error-page");
        }
        setLoading(false);
        setData(null);
        setError(error);
      });
  };

  const postFn = () => {
    setLoading(true);
    axios
      .post(`${baseURL}${path}`, body, config)
      .then((response) => {
        setLoading(false);
        setData(response?.data);
        setError(null);
        setToggle((prev) => !prev);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          navigate("/error-page");
        }
        setLoading(false);
        setData(null);
        setError(error?.response?.data);
        setToggle((prev) => !prev);
      });
  };

  return { data, error, loading, toggle, postFn, fetchFn };
};

export default useAxios;
