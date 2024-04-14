import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMenu = () => {
  const {
    data: menu = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/menu");
      return res.data;
    },
  });
  return [menu, loading, refetch];
};

export default useMenu;
