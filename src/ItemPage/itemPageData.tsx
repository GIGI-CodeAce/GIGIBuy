import { useEffect } from "react";

function fetchClothing(
  supabase: any,
  id: string | undefined,
  name: string | undefined,
  setClothing: Function,
  setError: Function,
  setLoading: Function
) {
  return useEffect(() => {
    const fetchClothing = async () => {
      try {
        if (!name) throw new Error("Invalid item name");

        // Format name by replacing hyphens with spaces
        const formattedName = name.replace(/-/g, " ");
        console.log("Fetching product with name:", formattedName);

        // Query using the formatted name
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
  }, [name]); // Now triggers on name changes
}

export default fetchClothing;