import { useEffect } from "react";
const useFetchClothing = (supabase, id, name, setClothing, setError, setLoading) => {
    useEffect(() => {
        const fetchClothing = async () => {
            try {
                if (!name)
                    throw new Error("Invalid item name");
                const formattedName = name.replace(/-/g, " ");
                const { data, error } = await supabase
                    .from("Clothing")
                    .select("*")
                    .ilike("name", formattedName)
                    .limit(1)
                    .single();
                if (error)
                    throw error;
                if (!data)
                    throw new Error("Item not found");
                setClothing(data);
            }
            catch (err) {
                setError(err.message || "Failed to fetch item");
            }
            finally {
                setLoading(false);
            }
        };
        fetchClothing();
    }, [name, id, supabase, setClothing, setError, setLoading]);
};
export default useFetchClothing;
