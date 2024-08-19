import { IProduct } from "@/common/types/product";
import { Link } from "react-router-dom";
import Pagination from "../../../../components/Pagination";

import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLocalStorage, useStorage } from "@/common/hooks/useStorage";
type ProductListProps = {
    products?: IProduct[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
};

export const formatVnd = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

const ProductList = ({ products, pagination }: ProductListProps) => {
    const { totalPages } = pagination || { totalPages: 3 };
    const [user] = useLocalStorage("user", {});
    // console.log(user.user._id);

    const { toast } = useToast();
    const { mutate } = useMutation({
        mutationFn: async (data: {
            userId: any;
            products: { productId: any; quantity: number };
        }) => {
            const response = await axios.post(
                `http://localhost:2202/api/v1/carts/add-to-cart`,
                data,
            );

            return response.data;
        },
        onSuccess: () => {
            toast({
                title: "Thêm vào giỏ hàng thành công!",
                variant: "success", 
            });
        },
    });
    return (
        <div className="container">
            <h2 className="text-4xl ">News</h2>
            <hr className="my-5" />
            <div className="product-list">
                {products?.map((product: IProduct, index: number) => {
                    return (
                        <div key={index} className="product-item">
                            <div className="product-image">
                                <img
                                    src={product?.image}
                                    alt="#"
                                    className="product__thumbnail"
                                />
                                <span className="product-sale">
                                    {product?.discount}%
                                </span>
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="product__link"
                                    >
                                        {product?.name}
                                    </Link>
                                </h3>
                                <a href="#" className="product__category">
                                    Category
                                </a>
                                <div className="product-price">
                                    <span className="product-price__new">
                                        {formatVnd.format(
                                            product?.price -
                                                product?.price *
                                                    (product?.discount / 100),
                                        )}
                                    </span>
                                    <span className="product-price__old">
                                        {formatVnd.format(product?.price)}
                                    </span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <Link
                                    to={`/products/${product._id}`}
                                    className="btn product-action__quickview"
                                >
                                    Quick View
                                </Link>
                                <button
                                    className="btn product-action__addtocart"
                                    onClick={() =>
                                        mutate({
                                            userId: user.user?._id,
                                            products: {
                                                productId: product._id,
                                                quantity: 1,
                                            },
                                        })
                                    }
                                >
                                    Add To Cart
                                </button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">
                                        Share
                                    </span>
                                    <span className="product-action__compare">
                                        Compare
                                    </span>
                                    <span className="product-action__like">
                                        Like
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="pagination">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
};

export default ProductList;
