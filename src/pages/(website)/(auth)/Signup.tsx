import { useLocalStorage } from "@/common/hooks/useStorage";
import { useToast } from "@/components/ui/use-toast";
// import { useToast } from "@/components/ui/use-toast";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(3)
        .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const Signup = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [, setUser] = useLocalStorage("user", {});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (formData: {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        }) => {
            const { data } = await axios.post(
                "http://localhost:2202/api/v1/auth/signup",
                formData,
            );
            return data;
        },
        onSuccess: (data) => {
            setUser(data);
            toast({
                title: "Dang ky thanh cong!",
                variant: "success",
            });
            setTimeout(() => {
                navigate("/signin");
            }, 1000);
        },
        onError: (error) => console.log(error),
    });

    const onSubmit = (formData: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        mutate(formData);
    };
    return (
        <div className="container">
            <h2 className="text-3xl font-semibold text-center">Đăng ký</h2>
            <hr className="my-5" />
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="Name"
                    >
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true, minLength: 3 })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs italic">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="Email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        {...register("email", { required: true, minLength: 3 })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs italic">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs italic">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="******************"
                        {...register("confirmPassword", {
                            required: true,
                            minLength: 6,
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs italic">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <Link
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        to="/signin"
                    >
                        Bạn đã có tài khoản?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
