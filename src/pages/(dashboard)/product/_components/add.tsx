// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
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

// import { IProduct } from "@/common/types/product";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { addProduct } from "@/services/product";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Joi from "joi";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// type Inputs = {
//     name: string;
//     category?: string;
//     price: number;
//     // gallery?: string[];
//     image: string;
//     description: string;
//     discount: number;
//     countInStock: number;
//     featured: boolean;
// };

// const productSchema = Joi.object({
//     name: Joi.string().required(),
//     price: Joi.number().required(),
//     category: Joi.string(),
//     // gallery: Joi.array().items(Joi.string()),
//     image: Joi.string(),
//     description: Joi.string(),
//     discount: Joi.number(),
//     countInStock: Joi.number(),
//     featured: Joi.boolean(),
// });

// const ProductAdd = () => {
//     const navigate = useNavigate();

//     const { toast } = useToast();
//     const form = useForm({
//         resolver: joiResolver(productSchema),
//         defaultValues: {
//             name: "",
//             price: 0,
//             category: "",
//             // gallery: [],
//             image: "",
//             description: "",
//             discount: 0,
//             countInStock: 0,
//             featured: false,
//         },
//     });

//     const mutation = useMutation({
//         mutationFn: async (product: IProduct) => {
//             const { data } = await addProduct(product);
//             return data;
//         },
//         onSuccess: () => {
//             form.reset();
//             toast({
//                 title: "Thêm sản phẩm thành công",
//                 variant: "success",
//             });
//             setTimeout(() => {
//                 navigate(`/admin/products`);
//             }, 300);
//         },
//     });

//     const onSubmit: SubmitHandler<any> = (product) => {
//         mutation.mutate(product);
//         console.log(product);
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
//             <h2 className="text-2xl font-semibold">Thêm sản phẩm</h2>
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
//                         <label htmlFor="" className="form-label">
//                             Category
//                         </label>
//                         <select name="" id="">
//                             {data?.map((item, index) => (
//                                 <option key={index} value={item._id}>
//                                     {item.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div> */}
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
//                                         {categories?.map((item) => (
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
//                         control={form.control}
//                         name="gallery"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="gallery">Gallery</FormLabel>
//                                 <FormControl>
//                                     <Input {...field} id="gallery" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     /> */}
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
//                         name="countInStock"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel htmlFor="countInStock">
//                                     CountInStock
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} id="countInStock" />
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

// export default ProductAdd;
