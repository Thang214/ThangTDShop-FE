import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Catergories = () => {
    const { data: categories } = useQuery({
        queryKey: ["CATEGORY_LIST"],
        queryFn: async () => {
            const { data } = await axios.get(
                "http://localhost:2202/api/v1/categories",
            );
            return data;
        },
        staleTime: 60000, // Thời gian "cũ" được đặt là 1 phút (60000 miligiây)
    });
    return (
        <>
            <section className="news">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">Categories</h2>
                    </div>
                    <div>
                        <select className="your-select-css-class">
                            {categories?.map(
                                (category: { _id?: number; name: string }) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Catergories;
