import detail1 from "@/assets/upload/detail1.png";
import detail2 from "@/assets/upload/detail2.png";
import detail3 from "@/assets/upload/detail3.png";
import detail4 from "@/assets/upload/detail4.png";
import sofa1 from "@/assets/upload/sofa1.png";
import sofa2 from "@/assets/upload/sofa2.png";
import { useProductQuery } from "@/common/hooks/useProductQuery";
import "@/styles/detail.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductList from "../_components/ProductList";

const DetailProduct = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useProductQuery({ id: id! });
    console.log(product);
    const { data: relatedProduct } = useQuery({
        queryKey: ["RELATED_PRODUCT"],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:2202/api/v1/products/${product.category}/related/${product._id}`,
            );
            return data;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    console.log("relatedProduct", relatedProduct);
    return (
        // <div>
        //     {product?.name}

        //     <hr />
        //     <h3>Related Products</h3>
        //     {relatedProduct?.map((item) => (
        //         <div>
        //             <Link to={`/products/${item._id}`}>{item.name}</Link>
        //         </div>
        //     ))}
        // </div>
        <div>
            <div>
                <nav>
                    <div className="nav-bot">
                        <Link to="/">Home</Link>
                        <span>&gt;</span>
                        <Link to="products">Shop</Link>
                        <span>&gt;</span>
                        <p>Asgaard sofa</p>
                    </div>
                </nav>
                <div className="product-container">
                    <div className="product-image">
                        {/* Replace # with the actual image source */}
                        <div className="product-left">
                            <img src={detail1} alt="" />
                            <img src={detail2} alt="" />
                            <img src={detail3} alt="" />
                            <img src={detail4} alt="" />
                        </div>
                        <img src={product?.image} alt="Product Image" />
                    </div>
                    <div className="product-info">
                        <h2 className="product-name">{product?.name}</h2>
                        <p className="product-price">{product?.price}</p>
                        <p className="product-reviews">5 Customer Reviews</p>
                        <div className="product-description">
                            {product?.description}
                        </div>
                        <div className="product-size-color">
                            <p>
                                Size: <span className="select">L</span>
                                <span className="sizehihi">XL</span>
                                <span className="sizehihi">XS</span>
                            </p>
                        </div>
                        <div className="product-size-color">
                            <p>Color:</p>
                            <br />
                            <div>
                                <button className="main-text__violet" />
                                <button className="main-text__black" />
                                <button className="main-text__brown" />
                            </div>
                        </div>
                        <div className="product-btn">
                            <button className="my-button">
                                <span className="symbol minus">-</span>
                                <span className="label">0</span>
                                <span className="symbol plus">+</span>
                            </button>
                            <Link to={"/cart"}>
                                <button className="add-to-cart">
                                    Add To Cart
                                </button>
                            </Link>
                            <button className="compare">+ Compare</button>
                        </div>
                        <div className="product-card">
                            <div className="product-card-item">
                                <div className="product-card-name">SKU</div>
                                <div className="product-card-name">
                                    Category
                                </div>
                                <div className="product-card-name">Tags</div>
                                <div className="product-card-name">Share</div>
                            </div>
                            <div className="product-card-item">
                                <div className="product-card-name">: SS001</div>
                                <div className="product-card-name">: Sofas</div>
                                <div className="product-card-name">
                                    : Sofa, Chair, Home, Shop
                                </div>
                                <div className="product-card-name">: Share</div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="product-description">
                    <div className="container">
                        <div className="product-description-item">
                            <div className="product-description-tab product-description-tab-active">
                                <p>Description</p>
                            </div>
                            <div className="product-description-tab">
                                <p>Additional Information</p>
                            </div>
                            <div className="product-description-tab">
                                <p>Reviews [5]</p>
                            </div>
                        </div>
                        <div className="product-description-content">
                            <p>
                                Embodying the raw, wayward spirit of rock ‘n’
                                roll, the Kilburn portable active stereo speaker
                                takes the unmistakable look and sound of
                                Marshall, unplugs the chords, and takes the show
                                on the road. Weighing in under 7 pounds, the
                                Kilburn is a lightweight piece of vintage styled
                                engineering. Setting the bar as one of the
                                loudest speakers in its class, the Kilburn is a
                                compact, stout-hearted hero with a well-balanced
                                audio which boasts a clear midrange and extended
                                highs for a sound that is both articulate and
                                pronounced. The analogue knobs allow you to fine
                                tune the controls to your personal preferences
                                while the guitar-influenced leather strap
                                enables easy and stylish travel.
                            </p>
                            <div className="product-description-content-img">
                                <img src={sofa1} alt="#" />
                                <div className="hihi"></div>
                                <img src={sofa2} alt="#" />
                            </div>
                        </div>
                    </div>
                </section>
                <ProductList relatedProduct={relatedProduct?.product} />
            </div>
        </div>
    );
};

export default DetailProduct;
