import { useEffect } from "react";

const useFetchClothing = (
  supabase: any,
  id: string | undefined,
  name: string | undefined,
  setClothing: Function,
  setError: Function,
  setLoading: Function
) => {
  useEffect(() => {
    const fetchClothing = async () => {
      try {
        if (!name) throw new Error("Invalid item name");

        const formattedName = name.replace(/-/g, " ");
        // console.log("Fetching product with name:", formattedName);

        const { data, error } = await supabase
          .from("Clothing")
          .select("*")
          .ilike("name", formattedName)
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Item not found");

        setClothing(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };

    fetchClothing();
  }, [name, id, supabase, setClothing, setError, setLoading]);
};

export default useFetchClothing;
