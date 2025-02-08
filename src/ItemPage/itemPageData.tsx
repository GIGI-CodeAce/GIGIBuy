import { useEffect } from "react";


function fetchClothing(supabase: any, id: string|undefined, 
    setClothing: Function, setError: Function, setLoading: Function){
    return(
        useEffect(() => {
            const fetchClothing = async () => {
              try {
                if (!id) throw new Error("Invalid item name");
        
                const formattedName = id.replace(/-/g, " ");
                console.log("Fetching product with name:", formattedName);
        
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
          }, [id])
    )
}

export default fetchClothing