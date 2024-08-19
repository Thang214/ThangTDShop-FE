/* eslint-disable @typescript-eslint/no-explicit-any */

import useCart from "@/common/hooks/useCart";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { ChangeEvent } from "react";
import { Table, Button, InputNumber, Typography } from "antd";
import { UpOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CartPage = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const {
        data,
        handleQuantityChange,
        calculateTotal,
        mutate: updateCart,
    } = useCart();

    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (text: any, record: any) => (
                <InputNumber
                    min={1}
                    value={text}
                    onChange={(value: number | string | undefined) =>
                        handleQuantityChange(record.productId, {
                            target: { value: value?.toString() },
                        } as ChangeEvent<HTMLInputElement>)
                    }
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: any) => (
                <span>
                    <Button
                        icon={<UpOutlined />}
                        onClick={() =>
                            updateCart({
                                action: "INCREMENT",
                                productId: record.productId,
                            })
                        }
                    />
                    <Button
                        icon={<DownOutlined />}
                        onClick={() =>
                            updateCart({
                                action: "DECREMENT",
                                productId: record.productId,
                            })
                        }
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            updateCart({
                                action: "REMOVE",
                                productId: record.productId,
                            })
                        }
                    />
                </span>
            ),
        },
    ];

    const dataSource = data?.products.map((product: any, index: number) => ({
        key: index,
        index: index + 1,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        total: product.price * product.quantity,
    }));

    return (
        <div className="container">
            <Title level={2}>Giỏ hàng</Title>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
            <Title level={4}>Tổng cộng: ${calculateTotal()}</Title>
        </div>
    );
};

export default CartPage;
