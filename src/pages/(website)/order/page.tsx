import useCart from "@/common/hooks/useCart";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { IProduct } from "@/common/types/product";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const formatVnd = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});
const OrderPage = () => {
    const form = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, calculateTotal } = useCart();
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await axios.post(
                "http://localhost:2202/api/v1/orders",
                order,
            );
            return data;
        },
        onSuccess: () => {
            // navigate("/thankyou")
            alert("Đặt hàng thành công");
        },
    });

    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
        });
    };
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-4">Trang đặt hàng</h1>
            <hr className="my-3" />
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tên"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Số điện thoại
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Số điện thoại"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Email của bạn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Hoàn thành đơn hàng</Button>
                        </form>
                    </Form>
                </div>
                <div className="col-span-4">
                    {data?.products?.map((item: IProduct) => (
                        <div key={item._id} className="border-b py-4">
                            <h4 className="font-bold text-xl">{item.name}</h4>
                            <p>Giá: {formatVnd.format(item.price)}</p>
                            <p>Số lượng:{item.quantity}</p>
                        </div>
                    ))}
                    <p className="mt-5">
                        <strong className="mr-2">Sản phẩm:</strong>
                        {data?.products ? data?.products.length : 0}
                    </p>
                    <p>
                        <strong className="mr-2 my-2 text-xl">
                            Tổng tiền:
                        </strong>{" "}
                        {formatVnd.format(calculateTotal())}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
