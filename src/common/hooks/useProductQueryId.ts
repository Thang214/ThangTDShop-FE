import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/product";

function useProductQueryId(id: any) {
    const { data, isLoading } = useQuery({
        queryKey: ["ProductId"],
        queryFn: async () => {
            try {
                const response = await getProductById(id);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
    });

    return { data, isLoading };
}

export default useProductQueryId;