// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { IProduct } from "@/common/types/product";
// import { editProduct } from "@/services/product";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import Joi from "joi";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useToast } from "@/components/ui/use-toast";
// import axios from "axios";
// import useProductQueryId from "@/common/hooks/useProductQueryId";
// type Inputs = {
//     name: string;
//     category?: string;
//     price: number;
//     // gallery?: string[];
//     image: string;
//     description: string;
//     discount: number;
//     featured: boolean;
//     countInStock: number;
// };

// const productSchema = Joi.object({
//     name: Joi.string().required(),
//     price: Joi.number().required(),
//     category: Joi.string(),
//     // gallery: Joi.array().items(Joi.string()),
//     image: Joi.string(),
//     description: Joi.string(),
//     discount: Joi.number(),
//     featured: Joi.boolean(),
//     countInStock: Joi.number(),
// });

// const ProductEdit = () => {
//     const { id }: any = useParams();
//     // console.log(id);
//     const navigate = useNavigate();
//     const { data } = useProductQueryId(id);
//     const { toast } = useToast();

//     const form = useForm({
//         // resolver: joiResolver(productSchema),
//         defaultValues: {
//             name: "",
//             price: 0,
//             category: localStorage.getItem("selectedCategory") || "",
//             // gallery: [],
//             image: "",
//             description: "",
//             discount: 0,
//             featured: false,
//             countInStock: 0,
//         },
//     });

//     useEffect(() => {
//         // if (data) {
//         form.reset(data);
//         // }
//     }, [data, form]);

//     const mutation = useMutation({
//         mutationFn: async (product: IProduct) => {
//             const { data } = await editProduct(id, product);
//             return data;
//         },
//         onSuccess: () => {
//             form.reset();
//             toast({
//                 title: "Sửa sản phẩm thành công",
//                 variant: "success",
//             });
//             setTimeout(() => {
//                 navigate("/admin/products");
//             }, 300);
//         },
//     });

//     const onSubmit: SubmitHandler<Inputs> = (product) => {
//         // Lưu giá trị danh mục sản phẩm vào local storage
//         localStorage.setItem("selectedCategory", product.category || "");
//         mutation.mutate(product);
//     };

//     const { data: categories } = useQuery({
//         queryKey: ["CATEGORIES"],
//         queryFn: async () => {
//             const response = await axios.get(
//                 `http://localhost:2202/api/v1/categories`,
//             );
//             return response.data;
//         },
//     });
//     return (
//         <>
//             <h2 className="text-2xl font-semibold">Sửa sản phẩm</h2>
//             <hr className="my-5" />
//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-8"
//                 >
//                     <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="name">Name</FormLabel>
//                                 <FormControl>
//                                     <Input {...field} id="name" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     ></FormField>
//                     <FormField
//                         control={form.control}
//                         name="price"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="price">Giá</FormLabel>
//                                 <FormControl>
//                                     <Input {...field} id="price" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     ></FormField>
//                     {/* <div>
//                     <label htmlFor="" className="form-label">
//                         Category
//                     </label>
//                     <select name="" id="">
//                         {data?.map((item, index) => (
//                             <option key={index} value={item._id}>
//                                 {item.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div> */}
//                     <FormField
//                         control={form.control}
//                         name="category"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="category">
//                                     Category
//                                 </FormLabel>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     defaultValue={field.value}
//                                 >
//                                     <FormControl>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select a category" />
//                                         </SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                         {categories?.map((item: any) => (
//                                             <SelectItem value={item._id}>
//                                                 {item.name}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     ></FormField>
//                     {/* <FormField
//                     control={form.control}
//                     name="category"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel htmlFor="category">
//                                 Category
//                             </FormLabel>
//                             <FormControl>
//                                 <Input {...field} id="category" />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 ></FormField> */}
//                     {/* <FormField
//                     control={form.control}
//                     name="gallery"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel htmlFor="gallery">Gallery</FormLabel>
//                             <FormControl>
//                                 <Input {...field} id="gallery" />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 /> */}
//                     <FormField
//                         control={form.control}
//                         name="image"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="image">Image</FormLabel>
//                                 <FormControl>
//                                     <Input {...field} id="image" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="description"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="description">
//                                     Description
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} id="description" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="discount"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="discount">
//                                     Discount
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} id="discount" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="featured"
//                         render={({ field }) => (
//                             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                                 <FormControl>
//                                     <Checkbox
//                                         checked={field.value}
//                                         onCheckedChange={field.onChange}
//                                     />
//                                 </FormControl>
//                                 <div className="space-y-1 leading-none">
//                                     <FormLabel>Featured?</FormLabel>
//                                 </div>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <Button variant="destructive" type="submit">
//                         Submit
//                     </Button>
//                 </form>
//             </Form>
//         </>
//     );
// };

// export default ProductEdit;
